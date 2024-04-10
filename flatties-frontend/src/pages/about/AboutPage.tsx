import React from "react";
import { Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./AboutPage.css";

function AboutPage() {
  const containerStyle = {
    padding: "20px",
  };

  const paperStyle = {
    padding: "15px",
    marginBottom: "20px",
  };

  const avatarStyle = {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  };

  return (
    <Container style={containerStyle}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Flatties. Our goal is to provide a streamlined property
        rentals experience for those looking for flatmates, tenants, or a new
        place to call home! We are a dynamic team of three enthusiastic
        developers committed to honing our skills while delivering a seamless
        user experience.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Our Project:
      </Typography>
      <Typography variant="body1" paragraph>
        Powered by the MERN (MongoDB, Express.js, React.js, Node.js) stack, our
        web app is designed to simplify the rental property search process.
        Embracing Agile and Extreme Programming methodologies, we foster a work
        environment that thrives on adaptability and collaboration. Our team
        believes in the power of iteration, constantly refining and enhancing
        our web app as our skills and knowledge evolve. This site is not only a
        platform for continuous learning but also a showcase of our abilities as
        developers.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Our Team:
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            name: "Benjamin Polglase",
            bio: (
              <Typography variant="body1" paragraph>
                I'm a recent graduate who decided to make a career shift to
                follow my passion for technology and problem-solving. The
                aspects of software development I enjoy the most are
                collaborating with others, creating real solutions, and the
                constant learning that is required. Beyond the world of coding,
                you'll find me immersed in my love for football, curating a
                diverse collection of records, and indulging in my interests in
                history and movies. Excited about this new chapter, I bring not
                only technical skills but also a rich set of experiences and
                interests to the software realm.
              </Typography>
            ),
          },
          {
            name: "Eirik Enriquez",
            bio: (
              <Typography variant="body1" paragraph>
                Hey hey, I'm Eirik Enriquez, a 21-year-old Filipino fresh out of
                the computer science oven. I'm all about celebrating diverse
                backgrounds, which probably explains my fascination with
                programming, especially web development. When I'm not lost in
                code, you might catch me gaming, cheering on my favorite boxers,
                or perfecting the art of personal grooming. I thrive on my
                passion for technology and interest in problem-solving.
              </Typography>
            ),
          },
          { name: "William Wang", bio: "Some bio" },
        ].map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper style={paperStyle} elevation={3}>
              <Avatar style={avatarStyle}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="body2" paragraph>
                {member.bio}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AboutPage;
