import React, {Component} from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = "AIzaSyBvO0Wo1No01eclVFySRe-TjqER_pnDZGA";

//CREATE A NEW COMPONENT, THIS COMPONENT SHOULD PROUCE
//SOME HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("KOTET");
  }
    // this.render = this.render.bind(this);
    videoSearch(term) {
      YTSearch({key: API_KEY, term: term},
      (videos)=> {this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })})
    }

    render() {
      const videoSearch = _.debounce((term)=> {this.videoSearch(term)}, 300);
      return (
        <div>
          <SearchBar onSearchTermChange={videoSearch} />
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList onVideoSelect={selectedVideo=> this.setState({selectedVideo})} videos={this.state.videos}/>
        </div>
      );
    }
}


//TAKE THIS COMPONENTS GENERATED HTML AND PUT IT ON THE PAGE
//(IN THE DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
