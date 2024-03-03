const router = require('express').Router();
const supabase = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth'); // Adjust the path according to your structure

// Rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

router.get('/user', auth, async (req, res) => {
    try {
        const organizerId = req.organizer.id; // Assuming your auth middleware sets this
        const { data: organizer, error } = await supabase
            .from('organizers')
            .select('organizer_id, email, name, created_at')
            .eq('organizer_id', organizerId)
            .maybeSingle();

        if (error || !organizer) {
            return res.status(404).json({ msg: 'Organizer not found' });
        }

        res.json(organizer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/signup', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail(),
    body('password').isLength({ min: 2 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const emailLowercase = email.toLowerCase(); // Convert email to lowercase

    try {
        const { data: userExists, error: userExistsError } = await supabase
            .from('organizers')
            .select('*')
            .eq('email', emailLowercase)

        if (userExistsError) throw userExistsError;

        if (userExists.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: newUser, error: newUserError } = await supabase
            .from('organizers')
            .insert([{ name, email: emailLowercase, password: hashedPassword }])
            .select('*')
            .single();

        if (newUserError) throw newUserError;

        const payload = {
            organizer: {
                id: newUser.organizer_id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ organizerId: newUser.organizer_id, name: newUser.name });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// login endpoint
router.post('/login', loginLimiter, [
    body('email').isEmail(),
    body('password').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const emailLowercase = email.toLowerCase(); // Convert email to lowercase

    try {
        const { data: organizer, error } = await supabase
            .from('organizers')
            .select('*')
            .eq('email', emailLowercase)
            .single();

        if (error || !organizer) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, organizer.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            organizer: {
                id: organizer.organizer_id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ organizerId: organizer.organizer_id , name: organizer.name });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'None',
    }).sendStatus(200);
});


module.exports = router;
