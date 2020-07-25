var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// OMDb API KEY: 176594d5

// MovveFinder Class Component
var MovieFinder = function (_React$Component) {
  _inherits(MovieFinder, _React$Component);

  function MovieFinder(props) {
    _classCallCheck(this, MovieFinder);

    var _this = _possibleConstructorReturn(this, (MovieFinder.__proto__ || Object.getPrototypeOf(MovieFinder)).call(this, props));

    _this.state = {
      searchTerm: "",
      results: []
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
      event.preventDefault();

      // Store API key and update searchTerm to reflect current value for OMDb request
      var apiKey = "176594d5";
      var searchTerm = this.state.searchTerm;

      searchTerm = searchTerm.trim();

      // If no search term is provided, abort the request
      if (!searchTerm) {
        return;
      }

      // Make AJAX request to retrieve a list of results
      fetch("https://www.omdbapi.com/?s=" + searchTerm + "&apikey=" + apiKey).then(function (response) {
        // If the response is good, return data to next block in chain
        if (response.ok) {
          return response.json();
        }

        // Throw an error if response if not between 200-299
        throw new Error("Request was either a 404 or 500");
      }).then(function (data) {
        console.log(data); // log the response data for now
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          searchTerm = _state.searchTerm,
          results = _state.results; // ES6 destructuring

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
            results.map(function (movie) {
              return null; // returns nothing for now
            })
          )
        )
      );
    }
  }]);

  return MovieFinder;
}(React.Component);

// Render MovieFinder App


ReactDOM.render(React.createElement(MovieFinder, null), document.getElementById("root"));