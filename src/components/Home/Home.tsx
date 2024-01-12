import useNews from "../../hooks/news";
import Loading from "./Loading";
import Error from "./Error";
import { Article } from "./Article";
import { useEffect, useState, useCallback } from "react";
import { IArticle } from "../../models";
import {
  TextField,
  Container,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

const Home: React.FC = () => {
  const { error, news, loading } = useNews();
  const [query, setQuery] = useState<string>('');
  const [newData, setNewData] = useState<IArticle[]>([]);
  const [queryArray, setQueryArray] = useState<string[]>([]);

  const searchNews = useCallback(() => {
    setQueryArray(query?.toLowerCase().match(/\S+/g) || []);

    let newArray: IArticle[] = [];

    queryArray.forEach((element) => {
      news?.forEach((item) => {
        if (
          element.includes(" ") === false &&
          (item.title.toLowerCase().includes(element) ||
            (item.description && item.description.toLowerCase().includes(element))) &&
          newArray.indexOf(item) === -1
        ) {
          newArray.push(item);
        }
      });
    });

    setNewData(newArray);
  }, [query, queryArray, news]);

  useEffect(() => {
    searchNews();
  }, [searchNews]);

  return (
    <>
      <Container sx={{ padding: { xs: '2rem', md: '2rem' } }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Filter by keywords
          </Typography>

          <TextField
            type="search"
            placeholder="I'm searching for..."
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
            sx={{
              my: "1rem",
              maxWidth: "30rem",
            }}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && <Loading />}
        {error && <Error error={error} />}

        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Results: {query === '' ? (news?.length || 0) : newData.length}
        </Typography>

        <Grid container spacing={3} my={1}>
          {(query === '' ? news : newData).map((item) => (
            <Article key={item.url} data={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default Home;
