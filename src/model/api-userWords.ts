import type { Word, UserWord } from './app-types';

const API_ENDPOINT = 'https://rss-rs-lang.herokuapp.com';

// Get All user's Words
export async function getUserWords (userId:string, token:string){
  let rawResponse;
  try{
    rawResponse =  await fetch(`${API_ENDPOINT}/users/${userId}/words`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    }).then((res:UserWord []) => res);
  }catch(err){
    console.log(err);
  }
  return rawResponse;

}

// Create a user's Word

export async function createUserWord (userId: string, word:Word, difficulty:string, token: string){
  const newWord:UserWord = {
    difficulty,
    optional:{
      postDate:new Date(),
      lastUpdatedDate: new Date(),
      word,
    },
  };
  let rawResponse;
  try{
    rawResponse = await fetch(`${API_ENDPOINT}/users/${userId}/words/${word.id}`, {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newWord),
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    }).then((res:UserWord) => {
      console.log('createUserWord Response: ', res);
      return res;
    });
  }catch(err){console.log(err);}
  return rawResponse;
}

// Get a user's Word by Id

export async function getUserWordById (userId:string, wordId:string, token:string){
  let rawResponse;
  try{
    rawResponse = await fetch(`${API_ENDPOINT}/users/${userId}/words/${wordId}`, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    }).then((res:UserWord) =>
      // console.log('getUserWordById Response: ', res);
      res,
    );
  } catch(err){console.log(err);}
  return rawResponse;
}

// Update a user's Word 

// Schema = {
//     "difficulty": "string",
//     "optional": {
//      }
//   }

export async function updateUserWord (userId:string, token:string, updUserWord:UserWord){
  let rawResponse;
  const updatedWord = updUserWord;
  updatedWord.optional.lastUpdatedDate = new Date();
  try{
    rawResponse = fetch(`${API_ENDPOINT}/users/${userId}/words/${updatedWord.optional.word.id}`, {
      method: 'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(updatedWord),
    }).then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    }).then((res:UserWord) =>
    //  console.log('updateUserWord Response: ', res);
      res,
    );
  }catch(err){console.log(err);}
  return rawResponse;
}

// DELETE user's word by Id

export async function deleteUserWord (userId:string, wordId:string, token:string){

  try{
    await fetch(`${API_ENDPOINT}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    }).then(res => {
      console.log(`${res.status} - Word with id ${wordId} has been DELETED from user's words`);
    });
  }catch(err){console.log(err);}

}

export type TAggrWordsQuery = {
  filter?: string;
  group?:string ;
  page?: string;
};

export type TAggrResponse = [{paginatedResults:Word []}];

// GET user's aggregated WORDS

export async function getUserAggregatedWords (userId:string, token:string, query:TAggrWordsQuery){
  const url = new URL (`${API_ENDPOINT}/users/${userId}/aggregatedWords`);
  const params = Object.entries(query);
  const queryParams = new URLSearchParams(params);
  url.search = queryParams.toString(); // url + ? + params
  let rawResponse;
  try{
    rawResponse = await fetch(url, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    }).then(((res:TAggrResponse) => res[0].paginatedResults));
  }catch(err){console.log(err);}
  return rawResponse;
};

// GET user's aggregated WORD
export async function getUserAggregatedWordById (userId:string, wordId:string, token:string){
  const url = new URL (`${API_ENDPOINT}/users/${userId}/aggregatedWords/${wordId}`);
  let rawResponse;
  try{
    rawResponse = await fetch(url, {
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    }).then(((res:UserWord) => res));
  }catch(err){console.log(err);}
  return rawResponse;
};
