
import UserProfile from '../components/UserPage/UserProfile';
import user from '../data/Userdata';

const App = () => {
  return (
    <div className="App">
      <UserProfile user={user} />
    </div>
  );
};

export default App;
