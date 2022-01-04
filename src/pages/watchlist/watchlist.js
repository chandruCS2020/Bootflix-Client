import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Watchlist from '../../components/watchlistItem/WatchlistItem'
import './watchlist.css'
export default function watchlist() {
    return (
        <>
            <div className="watchlist">
                <Navbar  isloggedin={false} isSubscribed={false} />
                <div className="watchlistPage_container">
                    <div className="watchlist_title"><h1 className="watchlist_titlehead">Watchlist</h1></div>
                    <div className="watchlist_body">
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                        <Watchlist />
                    </div>
                </div>
            </div>
        </>
    )
}
