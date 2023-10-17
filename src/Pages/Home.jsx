import SideBar from '../Components/SideBar';
import Chat from '../Components/Chat';


function Home() {
  return (
    <div className='home'>
     <div className='container'>
      <SideBar />
      <Chat />
     </div>
    </div>
  );
}

export default Home;
