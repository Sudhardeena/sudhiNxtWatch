import './App.css'
import {Component} from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'

// Replace your code here
class App extends Component {
  state = {
    theme: 'light',
    savedVideosList: [],
  }

  changeTheme = () => {
    const {theme} = this.state
    if (theme === 'light') {
      this.setState({theme: 'dark'})
    } else {
      this.setState({theme: 'light'})
    }
  }

  saveVideo = videoDetails =>
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, videoDetails],
    }))

  removeVideo = videoDetails =>
    this.setState(prevState => ({
      savedVideosList: prevState.savedVideosList.filter(
        each => each.id !== videoDetails.id,
      ),
    }))

  render() {
    const {theme, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme,
          savedVideosList,
          saveVideo: this.saveVideo,
          removeVideo: this.removeVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
