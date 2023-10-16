import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

const Leaderboard = (props) => {
    const data = props.users.sort((a, b) => {
        const aUpvotes = props.stories.filter(story => story.author === a._id).reduce((acc, story) => acc + story.upvotes.length, 0);
        const bUpvotes = props.stories.filter(story => story.author === b._id).reduce((acc, story) => acc + story.upvotes.length, 0);
        return bUpvotes - aUpvotes;
      });
      const columns = useBreakpointValue({
        base: ["20%", "20%", "20%", "20%", "20%"],
        sm: ["25%", "20%", "20%", "20%", "15%"],
        md: ["15%", "25%", "20%", "20%", "20%"],
        lg: ["10%", "25%", "20%", "20%", "25%"],
        xl: ["10%", "20%", "20%", "20%", "30%"],
      });
const fontSize = useBreakpointValue({ base: "md", sm: "md", md: "lg", lg: "xl", xl: "2xl" });

return (
  <Table marginTop={20} variant="simple" width="100%">
    <Thead>
      <Tr>
        <Th width={columns[0]}>
          <Text align={"center"} fontSize={fontSize}>No.</Text>
        </Th>
        <Th width={columns[2]}>
          <Text align={"center"} fontSize={fontSize}>Profile Picture</Text>
        </Th>
        <Th width={columns[1]}>
          <Text align={"center"} fontSize={fontSize}>Name</Text>
        </Th>
        
        <Th width={columns[3]}>
          <Text align={"center"} fontSize={fontSize}>Total Stories</Text>
        </Th>
        <Th width={columns[4]}>
          <Text align={"center"}  fontSize={fontSize}>Total Upvotes</Text>
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((user, index) => (
        <Tr key={user._id}>
          <Td width={columns[0]}>
            <Text align={"center"} fontSize={fontSize} fontFamily="cursive">
              {index + 1}
            </Text>
          </Td>
          <Td width={columns[2]}>
            <center>
            <Image borderRadius={20} marginTop={3} marginBottom={3} height={20} width={20} src={user.image} />
            </center>
          </Td>
          <Td width={columns[1]}>
            <Text align={"center"} fontSize={fontSize} fontFamily="cursive">
              {user.name}
            </Text>
          </Td>
          
          <Td width={columns[3]}>
            <Text align={"center"} fontSize={fontSize} fontFamily="cursive">
              {[...props.stories].filter((story) => story.author === user._id).length}
            </Text>
          </Td>
          <Td width={columns[4]}>
            <Text align={"center"} fontSize={fontSize} fontFamily="cursive">
              {[...props.stories].filter((story) => story.author === user._id).reduce((acc, story) => acc + story.upvotes.length, 0)}
            </Text>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  );
}

export default Leaderboard
