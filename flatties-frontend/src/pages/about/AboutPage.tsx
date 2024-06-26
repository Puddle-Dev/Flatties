import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import EirikPhoto from "../../assets/images/eirik.jpg";
import BenPhoto from "../../assets/images/Ben.jpg";
import WilliamPhoto from "../../assets/images/William.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function AboutPage() {
  const containerStyle = { padding: "20px" };
  const paperStyle = {
    padding: "15px",
    marginBottom: "20px",
    height: "100%",
  };
  const avatarStyle = {
    width: "160px",
    height: "160px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 10px",
  };

  return (
    <Container style={containerStyle}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Flatties. Our goal is to provide a streamlined property
        rentals experience for those looking for flatmates, tenants, or a new
        place to call home! We are a dynamic team of three enthusiastic
        developers committed to honing our skills while delivering a seamless
        user experience.
      </Typography>

      <Typography variant="h5" gutterBottom>
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

      <Typography variant="h5" gutterBottom>
        Our Team:
      </Typography>
      <Typography variant="body1" paragraph>
        Our team is comprised of three developers, all recent graduates from
        Auckland University of Technology. We wanted a project that could allow
        us to work together and continue our growth. By challenging ourselves
        with real-world scenarios, we aim to bridge the gap between theory and
        practice, refining our skills and knowledge in web development. Our
        passion for creating user-friendly platforms drives us to deliver
        valuable services.
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            name: "Benjamin Polglase",
            bio: (
              <div>
                <Typography variant="body1" paragraph>
                  I'm a recent graduate who decided to make a career shift to
                  follow my passion for technology and problem-solving. The
                  aspects of software development I enjoy the most are
                  collaborating with others, creating real solutions, and the
                  constant learning that is required.
                </Typography>
                <Typography variant="body1" paragraph>
                  Beyond the world of coding, you'll find me immersed in my love
                  for football, collecting records, and indulging in my
                  interests in history and movies. I am excited about starting a
                  new chapter, I bring not only technical skills but also a rich
                  set of experiences and interests to the software realm.
                </Typography>
              </div>
            ),
            image: BenPhoto,
            github: "https://github.com/Bnjmn-P",
            linkedin: "https://www.linkedin.com/in/benjamin-polglase-ba3022275",
          },
          {
            name: "Eirik Enriquez",
            bio: (
              <div>
                <Typography variant="body1" paragraph>
                  Hey hey, I'm Eirik Enriquez, a 21-year-old Filipino fresh out
                  of the computer science oven. Currently, I'm whipping up
                  deliciousness at Taco Bell, and I absolutely love the job!
                  However, my heart is also set on transitioning into a software
                  job, where I can dive deeper into my passion for technology
                  and problem-solving.
                </Typography>
                <Typography variant="body1" paragraph>
                  I'm all about celebrating diverse backgrounds, which probably
                  explains my fascination with programming, especially web
                  development. When I'm not lost in code, you might catch me
                  gaming, cheering on my favorite boxers, or perfecting the art
                  of personal grooming. I thrive on the passion for technology
                  and interest in problem-solving.
                </Typography>
              </div>
            ),
            image: EirikPhoto,
            github: "https://github.com/eirikenriquez",
            linkedin:
              "https://www.linkedin.com/in/eirik-mykel-navarro-enriquez",
          },
          {
            name: "William Wang",
            bio: (
              <div>
                <Typography variant="body1" paragraph>
                  Kia ora, here is william. I am a recent graduate from the
                  University of Auckland, majoring in Computer Science and
                  Information Systems. I am passionate about software
                  development and I am always eager to learn new technologies.
                </Typography>
                <Typography variant="body1" paragraph>
                  I believe in living life with a positive attitude. One of my
                  passions is cooking, as good food can really bring people
                  together. You can often find me making family recipes for my
                  flatmates and friends to enjoy. I am also a big fan of music.
                  I used to play guitar in a school band and find playing music
                  a great way to relax and unwind. I am excited to start my
                  career in software development and I am looking forward to
                  working with you.
                </Typography>
              </div>
            ),
            image: WilliamPhoto,
            github: "https://github.com/wsking233",
            linkedin: "https://www.linkedin.com/in/william-wang-shuai",
          },
        ].map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper style={paperStyle} elevation={3}>
              <Avatar style={avatarStyle}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {member.name}
              </Typography>
              <div>
                <IconButton href={member.github} target="_blank">
                  <GitHubIcon />
                </IconButton>
                <IconButton href={member.linkedin} target="_blank">
                  <LinkedInIcon />
                </IconButton>
              </div>
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
