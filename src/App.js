import React, { Component } from "react";

import "./App.css";

import MovieRow from "./MovieRow.js";

import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    //[실습 19-1]

    this.performSearch("marvel");
  }

  //[실습 19-2][실습 19-3]

  performSearch(searchTerm) {
    console.log("tmdb Web Open API를 사용하여 검색 기능을 수행합니다..");

    const urlString =
      "https://api.themoviedb.org/3/search/movie?&api_key=4585341f278f0b2c7f7f22040ee7b13d&query=" +
      searchTerm;

    $.ajax({
      url: urlString,

      success: searchResults => {
        console.log("데이터를 가져오는데 성공함...");

        const results = searchResults.results;

        const movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;

          console.log(movie.poster_path);

          console.log(movie.title);

          //

          const movieRow = <MovieRow key={movie.id} movie={movie} />;

          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      },

      error: (xhr, status, err) => {
        console.log("데이터를 가져오는데 실패함...");
      }
    });
  }

  //[실습19-5]

  searchChangeHandler(event) {
    console.log(event.target.value);

    //[실습 20-2]

    const boundObj = this;

    const searchTerm = event.target.value;

    boundObj.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="60" src="logo.svg" />
              </td>

              <td width="8" />

              <td>
                <h2>eCom04 영화 DB 프로젝트</h2>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 15,

            display: "block",

            width: "99%",

            paddingTop: 8,

            paddingBottom: 8,

            paddingLeft: 16
          }}
          // [실습 20-1]

          onChange={this.searchChangeHandler.bind(this)}
          placeholder="여기에 영화 검색 키워드를 입력하세요.."
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
