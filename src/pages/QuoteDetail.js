import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "p1", author: "Max", text: "Learning React is a fun!!!" },
//   { id: "p2", author: "Maximiler", text: "Learning React is great" },
//   { id: "p3", author: "Milind", text: "Learning React is well..." },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {quoteId} = params;
  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
  console.log(match);

  useEffect( () => {
      sendRequest(quoteId);
  }, [sendRequest, quoteId])

  if(status === 'pending')
  {
      return <div className="centered">
          <LoadingSpinner />
      </div>
  }

  if(error)
  {
      return <p className='centered'>
          {error}
      </p>
  }

//   const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <h2>{params.quoteId}</h2> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
