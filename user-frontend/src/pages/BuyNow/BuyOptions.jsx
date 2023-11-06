import React from 'react'
import { Link } from 'react-router-dom';

const BuyOptions = () => {
    return (
        <div
            style={{
                display: 'flex',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                width: '600px',
                background: 'linear-gradient(to bottom right, #009999 30%, #000066 100%)',
                top: '20%',
                left: '30%',
                borderRadius: '10%',
                border: '4px solid black',
            }}
        >
            <Link to={'/buy-airtime'}>
                <button>Buy Airtime</button>
            </Link>
            <Link to={'/buy-data'}>
                <button>Buy Data</button>
            </Link>
            <Link to={'/buy-electricity'}>
                <button>Buy Electricity</button>
            </Link>
            <Link to={'/pay-water-bill'}>
                <button>Pay Water Bill</button>
            </Link>
        </div>
    )
}

export default BuyOptions