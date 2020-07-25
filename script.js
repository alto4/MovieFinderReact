var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// OMDb API KEY: 176594d5

// Movie Component - renders a card in the DOM for each result
var Movie = function Movie(props) {
  var _props$movie = props.movie,
      Title = _props$movie.Title,
      Year = _props$movie.Year,
      imdbID = _props$movie.imdbID,
      Type = _props$movie.Type,
      Poster = _props$movie.Poster; // ES6 destructuring

  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-4 col-md-3 mb-3" },
      React.createElement(
        "a",
        { href: "https://www.imdb.com/title/" + imdbID + "/", target: "_blank" },
        React.createElement("img", { src: Poster, className: "img-fluid" })
      )
    ),
    React.createElement(
      "div",
      { className: "col-8 col-md-9 mb-3" },
      React.createElement(
        "a",
        { href: "https://www.imdb.com/title/" + imdbID + "/", target: "_blank" },
        React.createElement(
          "h4",
          null,
          Title
        ),
        React.createElement(
          "p",
          null,
          Type,
          " | ",
          Year
        )
      )
    )
  );
};
// MovieFinder Class Component

var MovieFinder = function (_React$Component) {
  _inherits(MovieFinder, _React$Component);

  function MovieFinder(props) {
    _classCallCheck(this, MovieFinder);

    var _this = _possibleConstructorReturn(this, (MovieFinder.__proto__ || Object.getPrototypeOf(MovieFinder)).call(this, props));

    _this.state = {
      searchTerm: "",
      results: [],
      error: ""
    };

    // Control changes to the search input value
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  // handleChange function - handles changes made to the search input value by updating the searchTerm variable


  _createClass(MovieFinder, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ searchTerm: event.target.value });
    }

    // handleSubmit function - makes the request to OMDb API to get a list of results filtered to match the search term

  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();

      // Store API key and update searchTerm to reflect current value for OMDb request
      var apiKey = "176594d5";
      var searchTerm = this.state.searchTerm;

      searchTerm = searchTerm.trim();

      // If no search term is provided, abort the request
      if (!searchTerm) {
        return;
      }

      // checkStatus function - checks the status of a request before it is rendered
      var checkStatus = function checkStatus(response) {
        if (response.ok) {
          // .ok returns true if response status is 200-299
          return response;
        }
        throw new Error("Request was either a 404 or 500");
      };

      // Store response as a variable for processing
      var json = function json(response) {
        return response.json();
      };

      // Make AJAX request to retrieve a list of results
      fetch("https://www.omdbapi.com/?s=" + searchTerm + "&apikey=" + apiKey).then(function (response) {
        // If the response is good, return data to next block in chain
        if (response.ok) {
          return response.json();
        }

        // Throw an error if response if not between 200-299
        throw new Error("Request was either a 404 or 500");
      })
      // Update the results state, which will trigger individual movie cards to be rendered in the DOM if results exist
      .then(function (data) {
        _this2.setState({ results: data.Search });
      })
      // If no results are returned, provide the error message in the DOM and log to the console
      .catch(function (error) {
        _this2.setState({ error: error.message });
        console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          searchTerm = _state.searchTerm,
          results = _state.results,
          error = _state.error; // ES6 destructuring

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "form",
              { onSubmit: this.handleSubmit, className: "form-inline my-4" },
              React.createElement("input", {
                type: "text",
                className: "form-control mr-sm-2",
                placeholder: "frozen",
                value: searchTerm,
                onChange: this.handleChange
              }),
              React.createElement(
                "button",
                { type: "submit", className: "btn btn-primary" },
                "Submit"
              )
            ),
            function () {
              // If an error is returned, return it in the DOM
              if (error) {
                return error;
              }

              // Otherwise, results have successfully been returned and will be rendered in the DOM
              return results.map(function (movie) {
                return React.createElement(Movie, { key: movie.imdbID, movie: movie });
              });
            }()
          )
        )
      );
    }
  }]);

  return MovieFinder;
}(React.Component);

// Render MovieFinder App


ReactDOM.render(React.createElement(MovieFinder, null), document.getElementById("root"));