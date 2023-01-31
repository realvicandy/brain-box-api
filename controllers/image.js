const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '5606a5b884484899a1a4b28c96834f08'
});

const handleApiCall = (req, res) => {
	app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0].entries);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}







// const FACE_DETECT_MODEL = '6dc7e46bc9124c5c8824be4822abe105';

// const USER_ID = 'realvicandy';
// const PAT = '33c27a0a3f2547f789bc36bbdec57dcc';
// const APP_ID = 'my-first-application';
// const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
// const IMAGE_URL = this.state.input;

// const raw = JSON.stringify({
//   "user_app_id": {
//       "user_id": USER_ID,
//       "app_id": APP_ID
//   },
//   "inputs": [
//       {
//           "data": {
//               "image": {
//                   "url": IMAGE_URL
//               }
//           }
//       }
//   ]
// });

// const requestOptions = {
//   method: 'POST',
//   headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//   },
//   body: raw
// };