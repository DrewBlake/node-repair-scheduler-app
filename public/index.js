
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
	
	console.log(data.length);
	for(let j = 0; j < data.length; j++) {
		
		repairList += `<ul> Customer: ${data[j].firstName} ${data[j].lastName}'s 
						Repair History <br>Contact Info: ${data[j].contactInfo}</br></ul>`;
		for (let i = 0; i < data[j].repairInfo.length; i++) {
			repairList += `<li>${data[j].repairInfo[i].description}  
							Date: ${data[j].repairInfo[i].date}</li>`;	
		}
		$('.js-user-list').html(`${repairList}`);		
	}
	repairList = '';
}

function renderForm() {
	return `
		<form action='#' class="js-sign-up-form">
			<fieldset name="contact-info">
				<legend>Contact Info</legend>
		        <label for="first-name">Fist Name</label>
		        <input type="text" id="first-name" placeholder="First Name" required>
		        <br>
		        <label for="last-name">Last Name</label>
		        <input type="text" id="last-name" placeholder="Last Name" required>
		        <br>
		        <label for="email">Email</label>
		        <input type="email" id="email" placeholder="your@email.com">
		        <br>
		        <label for="phone">Phone #</label>
		        <input type="tel" pattern="[0-9/-]*" id="phone" placeholder="444-444-4444" required>
		        
		    </fieldset>
		    <fieldset name="User Info">
		    	<legend>User Info</legend>
		    	<label for="username">Username</label>
		        <input type="text" id="username" placeholder="Username" required>
		        <br>
		        <label for="password">Password</label>
		        <input type="text" id="password" placeholder="Password" required>
		    </fieldset>
		    <button type="submit">Submit</button>
	    </form>`;
}

function displayForm() {
	$('#js-user-form').html(renderForm);
}

function postDataToUserApi(data, callback) {
	const settings = {
		url: USER_SEARCH_URL,
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: callback
	}
	$.ajax(settings);
}

function handleSubmitButtonClick() {
	$('.js-sign-up-form').submit(function(event) {
		event.preventDefault();
		const firstName = $('#first-name').val();
		const lastName = $('#last-name').val();
		const email = $('#email').val();
		const phoneNumber = $('#phone').val();
		const username = $('#username').val();
		const password = $('#password').val();
		$('#first-name').val('');
		$('#last-name').val('');
		$('#email').val('');
		$('#phone').val('');
		$('#username').val('');
		$('#password').val('');
		console.log(firstName);
		console.log(lastName);
		console.log(email);
		console.log(phoneNumber);
		console.log(username);
		console.log(password);
	});
}

function handleBackButtonClick () {
	$('.js-back').on('click', function(event) {
		console.log('back pressed');
		$('.js-user-list').hide();
		$('.js-back').hide();
		$('.js-search-all-users').show();
	});
}

function handleSearchUsersButton () {
	$('.js-search-all-users').on('click', function(event) {
		console.log('hello2');
		getDataFromUserAPI(displayUserData);
		$('.js-back').show();
		$('.js-search-all-users').hide();
		$('.js-user-list').show();
	});
}

function handleSignUpButtonClick () {
	$('.js-sign-up').on('click', function(event) {
		console.log('sign up click');
		$('.js-sign-up').hide();
		displayForm();
		handleSubmitButtonClick();
	});
}

function runApp () {
	$('.js-back').hide();
	//$('.js-search-all-users').hide();
	handleSignUpButtonClick();
	handleSearchUsersButton();
	handleBackButtonClick();
}

$(runApp);