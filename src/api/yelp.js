import axios from 'axios';

export default axios.create({
    //base root url we will be making a request to
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 
            'Bearer PSpOOTxpFCOosFWfG71kl1DJ4TgVk4LF-SbPuvSQoxy27X10ZVt69l3ualpn9WndB2vyJTB_m4P-nrYvNPvjV_oUBMA1doPuhluk0vybcexTzS-lr7eUMptSe3vEXXYx'
    }
});

