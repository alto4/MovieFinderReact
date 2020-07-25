// OMDb API KEY: 176594d5

// Movie Component - renders a card in the DOM for each result
const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie; // ES6 destructuring

  return (
    <div className="row">
      <div className="col-4 col-md-3 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <img src={Poster} className="img-fluid" />
        </a>
      </div>
      <div className="col-8 col-md-9 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <h4>{Title}</h4>
          <p>
            {Type} | {Year}
          </p>
        </a>
      </div>
    </div>
  );
};
// MovieFinder Class Component
class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      error: "",
    };

    // Control changes to the search input value
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange function - handles changes made to the search input value by updating the searchTerm variable
  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // handleSubmit function - makes the request to OMDb API to get a list of results filtered to match the search term
  handleSubmit(event) {
    event.preventDefault();

    // Store API key and update searchTerm to reflect current value for OMDb request
    const apiKey = "176594d5";
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim();

    // If no search term is provided, abort the request
    if (!searchTerm) {
      return;
    }

    // checkStatus function - checks the status of a request before it is rendered
    const checkStatus = (response) => {
      if (response.ok) {
        // .ok returns true if response status is 200-299
        return response;
      }
      throw new Error("Request was either a 404 or 500");
    };

    // Store response as a variable for processing
    const json = (response) => response.json();

    // Make AJAX request to retrieve a list of results
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
      .then((response) => {
        // If the response is good, return data to next block in chain
        if (response.ok) {
          return response.json();
        }

        // Throw an error if response if not between 200-299
        throw new Error("Request was either a 404 or 500");
      })
      // Update the results state, which will trigger individual movie cards to be rendered in the DOM if results exist
      .then((data) => {
        this.setState({ results: data.Search });
      })
      // If no results are returned, provide the error message in the DOM and log to the console
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }

  render() {
    const { searchTerm, results, error } = this.state; // ES6 destructuring

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              {/* Input Component - for user to type in the search term */}
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="frozen"
                value={searchTerm}
                onChange={this.handleChange}
              />
              {/* Button - activates the search function */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {/* Area to render search results */}
            {(() => {
              // If an error is returned, return it in the DOM
              if (error) {
                return error;
              }

              // Otherwise, results have successfully been returned and will be rendered in the DOM
              return results.map((movie) => {
                return <Movie key={movie.imdbID} movie={movie} />;
              });
            })()}
          </div>
        </div>
      </div>
    );
  }
}

// Render MovieFinder App
ReactDOM.render(<MovieFinder />, document.getElementById("root"));
