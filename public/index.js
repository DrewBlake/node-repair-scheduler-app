
const USER_SEARCH_URL = '/api/users'; 
let token;

function getDataFromUserAPI(callback) {
	console.log(USER_SEARCH_URL);
	const settings = {
		url: USER_SEARCH_URL,
		type: 'GET',
		dataType: 'json',
		success: callback
	}
	$.ajax(settings);
}

function displayUserData(data) {
	console.log(data);
	console.log('hello1');
	let repairList = '';
	
	console.log(data.length);
	for(let j = 0; j < data.length; j++) {
		
		repairList += `<ul> Customer: ${data[j].firstName} ${data[j].lastName}'s 
						Repair History <br>Contact Info: ${data[j].contactInfo}</br></ul>`;
		for (let i = 0; i < data[j].repairInfo.length; i++) {
			repairList += `<li>${data[j].repairInfo[i].description}  
							Date: ${moment(data[j].repairInfo[i].date).format('MMM Do YYYY')}</li>`;	
		}
		$('.js-user-list').html(`${repairList}`);		
	}
	repairList = '';
}

function handleLogin(data) {
	token = data.authToken;
	console.log(token);
	$('#js-user-in-form').hide();
	$('.js-back').hide();
	$('.js-search-all-users').hide();

	//if()
}

function displaySignUpData(data) {
	let customerInfo = `Sign up successful! Your user name is: ${data.username}
		and your contact info is: ${data.contactInfo}`;

	$('.js-sign-up-list').html(customerInfo);
}

function renderSignUpForm() {
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

function renderSignInForm() {
	return `
		<form action='#' class="js-sign-in-form">
			<fieldset name="User Info">
		    	<legend>User Info</legend>
		    	<label for="usernameIn">Username</label>
		        <input type="text" id="usernameIn" placeholder="Username" required>
		        <br>
		        <label for="passwordIn">Password</label>
		        <input type="text" id="passwordIn" placeholder="Password" required>
		    </fieldset>
		    <button type="submit">Submit</button>
		</form>`;
}

function displaySignInForm() {
	$('#js-user-in-form').html(renderSignInForm);
}

function displaySignUpForm() {
	$('#js-user-form').html(renderSignUpForm);
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

function postDataToLoginApi(data, callback) {
	$('.js-sign-in-error').hide();
	const settings = {
		url: 'api/auth/login',
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: callback,	
	}
	$.ajax(settings).fail(function() {
		$('.js-sign-in-error').html('<h2>Incorrect username or password</h2>');
		$('.js-sign-in-error').show();
	});
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
		const userData = {
			username: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
			contactInfo: {
				phoneNumber: phoneNumber,
				email: email
			}
		}
		console.log(userData);
		postDataToUserApi(userData, displaySignUpData);
		$('.js-user-list').show();
		$('.js-sign-up-form').hide();
		$('.js-sign-up').show();
	});
}

function handleSubmitInButtonClick() {
	$('.js-sign-in-form').submit(function(event) {
		event.preventDefault();
		const usernameIn = $('#usernameIn').val();
		const passwordIn = $('#passwordIn').val();
		$('#usernameIn').val('');
		$('#passwordIn').val('');
		console.log(usernameIn);
		console.log(passwordIn);
		
		const userData = {
			username: usernameIn,
			password: passwordIn
		}
		postDataToLoginApi(userData, handleLogin);

	});
}

function handleBackButtonClick() {
	$('.js-back').on('click', function(event) {
		console.log('back pressed');
		$('.js-user-list').hide();
		$('#js-user-form').hide();
		$('#js-user-in-form').hide();
		$('.js-back').hide();
		$('.js-sign-up').show();
		$('.js-sign-in').show();
		$('.js-sign-in-error').hide();
		$('.js-search-all-users').show();
	});
}

function handleSearchUsersButton() {
	$('.js-search-all-users').on('click', function(event) {
		console.log('hello2');
		getDataFromUserAPI(displayUserData);
		$('.js-back').show();
		$('.js-search-all-users').hide();
		$('.js-user-list').show();
	});
}

function handleSignInButtonClick() {
	$('.js-sign-in').on('click', function(event) {
		$('.js-sign-in').hide();
		$('.js-sign-up').hide();
		console.log('sign in click');
		$('.js-back').show();
		$('#js-user-in-form').show();
		displaySignInForm();
		handleSubmitInButtonClick();
	});
}

function handleSignUpButtonClick() {
	$('.js-sign-up').on('click', function(event) {
		console.log('sign up click');
		$('.js-sign-up').hide();
		$('.js-sign-in').hide();
		$('.js-back').show();
		$('#js-user-form').show();
		displaySignUpForm();
		handleSubmitButtonClick();
	});
}

function runApp() {
	$('.js-back').hide();
	//$('.js-search-all-users').hide();
	handleSignInButtonClick();
	handleSignUpButtonClick();
	handleSearchUsersButton();
	handleBackButtonClick();
}

$(runApp);