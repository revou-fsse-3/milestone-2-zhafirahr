import { useParams, useNavigate } from "react-router";
import useNews from "../hooks/news";
import Error from "./Home/Error";
import Loading from "./Home/Loading";
import { Button, Box, Typography, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type ArticlePageParams = {
  id: string;
};

const ArticlePage: React.FC = () => {
  const { error, news, loading } = useNews();
  const { id } = useParams<ArticlePageParams>();
  const index = Number(id);
  const articleData = news.find((item) => item.source.id === index.toString());
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loading />}
      {error && <Error error={error} />}
      <Box
        component="img"
        sx={{
          height: 500,
          width: "100%",
          maxHeight: { xs: 200, sm: 300, md: 400 }
        }}
        alt={articleData?.title}
        src={articleData?.url}
      />
      <Box
        sx={{
          margin: { md: '4rem', xs: '1rem'},
          position: "absolute",
          top: { xs: 130, sm: 200, md: 250 },
          backgroundColor: "white",
          p: {md:"2rem 4rem", xs: '1rem 1.5rem'},
          width: {sm: '90%', md: '80%'},
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: "3rem", fontSize: { xs: "1.5rem" } }}
        >
          {articleData?.title}{" "}
        </Typography>
        <Typography variant="body1">{articleData?.description}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: "1rem", fontWeight: "600" }}
        >
          Learn more:{" "}
          <Link href={articleData?.url} underline="hover" color="inherit">
            {articleData?.title}
          </Link>
        </Typography>

        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{ marginTop: "3rem" }}
        >
          Back to homepage
        </Button>
      </Box>
    </>
  );
};

export default ArticlePage;
