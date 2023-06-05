import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Spacer,
  Container,
  Stack,
  useMediaQuery
} from '@chakra-ui/react';

function HomePage() {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        p={4}
        bg="gray.200"
        borderBottom="1px"
        borderColor="gray.300"
      >
        <Heading as="h1" size="xl">
          Welcome to My School
        </Heading>
        <Flex as="nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
        </Flex>
      </Flex>
      <Container maxW="container.lg" mt={8}>
        <Stack
          direction={isLargerThan768 ? 'row' : 'column'}
          spacing={8}
          align="center"
        >
          <Box flex="1">
            <Heading as="h2" size="lg" mb={4}>
              About Us
            </Heading>
            <Text>
              Welcome to My School, where we strive to provide quality education
              and a nurturing environment for our students. Our dedicated faculty
              and staff are committed to helping students reach their full potential.
            </Text>
          </Box>
          {isLargerThan768 && (
            <Box flex="1">
              <img
                src="https://example.com/school-image.jpg"
                alt="School Image"
                width="100%"
              />
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
