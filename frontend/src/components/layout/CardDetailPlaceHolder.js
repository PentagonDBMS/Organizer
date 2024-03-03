import React from 'react'
import { Card, Container, Divider, Header, CardContent, Icon, Placeholder } from 'semantic-ui-react'


export default function CardDetailPlaceHolder() {
    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Admin Details</Header>
            <Divider />
            <Card centered>
                <Placeholder>
                    <Placeholder.Image square />
                </Placeholder>
                <CardContent>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='very short' />
                            <Placeholder.Line length='medium' />
                        </Placeholder.Header>
                    </Placeholder>
                </CardContent>
                <CardContent extra>
                    <Icon name='time' />
                </CardContent>

            </Card>
        </Container>
    )
}
