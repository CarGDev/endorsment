import React from 'react'
import Feed from '../components/Feed'
import UserCard from '../components/UserCard'
import useAppStore from '../store/useAppStore'

const Home: React.FC = () => {
  const users = useAppStore((s) => s.users)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const suggestions = users.filter((u) => u.id !== currentUserId).slice(0, 3)

  return (
    <div className="feed-shell">
      <div className="container main-card" style={{display:'flex',gap:20,alignItems:'flex-start'}}>
        <nav className="left-nav">
          <div className="logo">RE</div>
          <ul>
            <li className="nav-item active">Home</li>
            <li className="nav-item">Messages</li>
            <li className="nav-item">Forums</li>
            <li className="nav-item">Media</li>
            <li className="nav-item">Settings</li>
          </ul>
        </nav>

        <main className="main-column" style={{flex:1,maxWidth:680}}>
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <h2>Feeds</h2>
            <div className="small">Recent · Friends · Popular</div>
          </header>

          <Feed />

          <div className="create-input card" style={{marginTop:12}}>
            <input placeholder="Share something..." style={{width:'100%',border:'none',outline:'none'}} />
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:8}}>
              <button className="button">Send</button>
            </div>
          </div>
        </main>

        <aside className="right-column">
          <section className="card">
            <h4>Stories</h4>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              {suggestions.map((u)=>(
                <div key={u.id} style={{textAlign:'center'}}>
                  <div className="avatar">{u.name[0]}</div>
                  <div className="small">{u.name.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card" style={{marginTop:12}}>
            <h4>Suggestions</h4>
            {suggestions.map((u)=>(
              <UserCard key={u.id} user={u} />
            ))}
          </section>

          <section className="card" style={{marginTop:12}}>
            <h4>Recommendations</h4>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <div className="rec">X</div>
              <div className="rec">Y</div>
              <div className="rec">Z</div>
            </div>
          </section>
        </aside>

      </div>
    </div>
  )
}

export default Home
