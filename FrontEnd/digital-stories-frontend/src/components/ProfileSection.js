import React from 'react'
import { VStack, Image, HStack, TableContainer, Tbody, Tr, Td, Text, Table } from '@chakra-ui/react'

const ProfileSection = (props) => {
    const user = props.user
    return (
        <VStack >
            <Image
                borderRadius='full'
                boxSize='250px'
                src={user.image}
                alt={user.name}
            />
            <HStack >
            <Text fontSize={"3xl"} fontFamily={"cursive"}>{user.name}</Text>
            </HStack>
            <HStack>
            <Text fontSize={"sm"} fontFamily={"cursive"}>{user.email}</Text>
            </HStack>
            <TableContainer>
                <Table>
                <Tbody>
                    <Tr>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>Stories</Text></Td>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>{[...props.stories].filter(story=>story.author===user._id).length}</Text></Td>
                    </Tr>
                    <Tr>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>Upvotes</Text></Td>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>{[...props.stories].filter(story=>story.author===user._id).reduce((acc, story) => acc + story.upvotes.length, 0)}</Text></Td>
                    </Tr>
                    <Tr>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>Downvotes</Text></Td>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>{[...props.stories].filter(story=>story.author===user._id).reduce((acc, story) => acc + story.downvotes.length, 0)}</Text></Td>
                    </Tr>
                    <Tr>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>Comments</Text></Td>
                    <Td><Text fontSize={"2xl"} fontFamily={"cursive"}>{[...props.stories].filter(story=>story.author===user._id).reduce((acc, story) => acc + story.comments.length, 0)}</Text></Td>
                    </Tr>
                </Tbody>
                </Table>
            </TableContainer>
            
        </VStack>
    )
}
export default ProfileSection