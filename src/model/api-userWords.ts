import type { Word, UserWord, UserWordDifficulty } from './app-types';

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

export async function createUserWord (
  userId: string,
  token: string,
  wordId: string,
  word: string,
  difficulty: UserWordDifficulty,
){
  const newWord: UserWord = {
    difficulty,
    optional:{
      postDate: new Date().toISOString(),
      theWord: word,
      wordId,
    },
  };
  let rawResponse;
  try{
    rawResponse = await fetch(`${API_ENDPOINT}/users/${userId}/words/${wordId}`, {
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
    }).then((res:UserWord) =>
      // console.log('createUserWord Response: ', res);
      res,
    );
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
  updatedWord.optional.lastUpdatedDate = new Date().toISOString();
  try{
    rawResponse = fetch(`${API_ENDPOINT}/users/${userId}/words/${updatedWord.optional.wordId}`, {
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
    }).then((res:UserWord) => res );
  } catch(err) { console.log(err); }
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
  wordsPerPage?: string;
};

export type TAggrResponse = [{
  paginatedResults: Word [];
  totalCount: Array<{count: number}>;
}];

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

export async function setUserWordDifficulty (
  userId: string,
  userToken: string,
  wordId: string,
  word: string,
  difficulty: UserWordDifficulty,
  isEntryExist?: boolean,
) {
  const isUserWordExisted =
    (isEntryExist !== undefined)
      ?  isEntryExist
      : (!!(await getUserWordById (userId, wordId, userToken)));

  const updUserWord: UserWord = {
    difficulty,
    optional:{
      wordId,
    },
  };

  if (isUserWordExisted) await updateUserWord(userId, userToken, updUserWord);
  else await createUserWord(userId, userToken, wordId, word, difficulty);
}

export async function getUserWordsCount (
  userId: string,
  token: string,
  wordType: UserWordDifficulty,
){
  const url = new URL (`${API_ENDPOINT}/users/${userId}/aggregatedWords`);
  const filter = `filter={"$and":[{"userWord.difficulty":"${wordType}"}]}`;
  const queryParams = new URLSearchParams(filter);
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
    }).then(((res:TAggrResponse) => {
      if (res[0].totalCount.length > 0){
        return res[0].totalCount[0].count;
      } return 0;
    }));

  } catch (err) { console.log(err); }

  return rawResponse;
};
