
const USER_SEARCH_URL = '/api/users'; 

function getDataFromUserAPI (callback) {
	console.log(USER_SEARCH_URL);
	const settings = {
		url: USER_SEARCH_URL,
		type: 'GET',
		dataType: 'json',
		success: callback
	}
	$.ajax(settings);
}

function displayUserData (data) {
	console.log(data);
	console.log('hello1');
	let repairList = '';
	//let userList = '';
	console.log(data.length);
	for(let j = 0; j < data.length; j++) {
		//userList += `<li> ${data[j].firstName} </li>`;
		//$('.js-user-info').html(userList);
		repairList += `<ul> Customer: ${data[j].firstName} ${data[j].lastName}'s 
						Repair History</ul>`;
		for (let i = 0; i < data[j].repairInfo.length; i++) {
			repairList += `<li>Problem: ${data[j].repairInfo[i].description} <br> 
							Date: ${data[j].repairInfo[i].date} </br></li>`;
			
		}
		//console.log(repairList);
		console.log(data[j].firstName);
		console.log(repairList);
		/*$('.js-user-info').append(`${item.username} <br> ${item.contactInfo} <br>
			${repairArray[0].description} <br><br> `);*/
		$('.js-user-list').html(`${repairList}`);		
	}

	//$('.js-user-info').html(userList);
}

function displayUserData2 (data) {
	let userList = '';
	//console.log(data.length);
	for(let j = 0; j < data.length; j++) {
		userList += `<li> ${data[j].firstName} </li>`;
		$('.js-user-info').html(userList);
	}
}

function handleSearchUsersButton () {
	$('.js-search-all-users').on('click', function(event) {
		console.log('hello2');
		//getDataFromUserAPI(displayUserData2);
		getDataFromUserAPI(displayUserData);
		$('.js-search-all-users').hide();
	});
}

$(handleSearchUsersButton);