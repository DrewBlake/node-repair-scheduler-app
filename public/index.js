'use strict';

let token;
let userId;
let admin;

// ajax function to get all users in database, for admin use only
function getDataFromUserAPI(callback) {	
	const settings = {
		headers: {
			authorization: `Bearer ${token}`
		},
		url: `/api/users/`,
		type: 'GET',
		dataType: 'json',
		success: callback
	}
	$.ajax(settings);
}

//ajax function to get specific user data by id
function getDataFromUserIdAPI(callback) {
	const settings = {
		headers: {
			authorization: `Bearer ${token}`
		},
		url: `/api/users/${userId}`,
		type: 'GET',
		dataType: 'json',
		success: callback
	}
	$.ajax(settings);
}

//ajax function to used to add repair info or update contact info
//depending on which data is sent to back end put function.
function putRepairDataToUserApi(data, callback) {
	console.log(userId);
	const settings = {
		headers: {
			authorization: `Bearer ${token}`
		},

		url: `/api/users/${userId}`,
		type: 'PUT',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: callback
	}
	$.ajax(settings);
}

//ajax function used to create new user
function postDataToUserApi(data, callback) {
	$('.js-error').hide();
	const settings = {
		url: '/api/users/',
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: callback
	}
	$.ajax(settings).fail(function(data) {
		console.log(data.responseJSON);
		let location = data.responseJSON.location;
		let message = data.responseJSON.message;
		$('.js-error').html(`<h2>Check ${location}. ${message}.</h2>`);
		$('.js-error').show();
	});
}


//ajax function used to login to existing account
function postDataToLoginApi(data, callback) {
	$('.js-error').hide();
	const settings = {
		url: 'api/auth/login',
		type: 'POST',
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: 'application/json',
		success: callback,	
	}
	$.ajax(settings).fail(function() {
		$('.js-error').html('<h2>Incorrect username or password.</h2>');
		$('.js-error').show();
	});
}

//ajax function used to delete user account by id
function deleteDataFromUserAPI(callback) {
	const settings = {
		headers: {
			authorization: `Bearer ${token}`
		},
		url: `/api/users/${userId}`,
		type: 'DELETE',
		dataType: 'json',
		success: callback
	}
	$.ajax(settings);
}

//displays delete confirmation message
function displayConfirmDelete() {
	$('.js-button-list').hide();
	$('#js-form').hide();
	$('.js-sign-in-back').hide();
	$('.js-info-list').hide();
	$('.js-back').show();
	$('.js-confirm').show();
	$('.js-confirm').html('<h2 class="deleted">Your account has been deleted</h2>');
}

//callback function used to display specific user data and 
//repair history 
function displayUserIdData(data) {
	let repairList = '';
	console.log('display id data');
	repairList = `<h2 class='message-header'> Customer ${data.firstName} ${data.lastName}'s 
		Repair Schedule History</h2><ul class='cust-data'><h3>--Contact Info--</h3>
		Email: <b>${data.contactInfo.email}</b><br>
		Phone Number: <b>${data.contactInfo.phoneNumber}</b></ul>`;
	console.log(data.repairInfo.length);
	for (let i = 0; i < data.repairInfo.length; i++) {
		repairList += `<li class='cust-data'>Vehicle complaint: <b>${data.repairInfo[i].description}</b><br>Scheduled repair date: 
		<b>${moment(data.repairInfo[i].date).format('MMM Do YYYY')}</b></li>`;
	}
	$('.js-info-list').html(repairList);
	repairList = '';
}

//callback function used to display all users and their repair
//history.  For admin use only
function displayUserData(data) {
	console.log(data);
	console.log('hello1');
	let repairList = '';
	
	console.log(data.length);
	for(let j = 0; j < data.length; j++) {
		
		repairList += `<h2 class='message-header'> Customer ${data[j].firstName} ${data[j].lastName}'s 
						Repair Schedule History</h2>
						<ul class='cust-data'>
						<h3>--Contact Info--</h3>Email: <b>${data[j].contactInfo.email}</b></br>
						Phone Number: <b>${data[j].contactInfo.phoneNumber}</b></ul><br>`;
		for (let i = 0; i < data[j].repairInfo.length; i++) {
			repairList += `<li class='cust-data'>Vehicle complaint: <b>${data[j].repairInfo[i].description}</b><br>
							Scheduled repair date: <b>${moment(data[j].repairInfo[i].date).format('MMM Do YYYY')}</b></li>`;	
		}
		$('.js-info-list').html(`${repairList}`);		
	}
	repairList = '';
}


//callback function to handle login data and display 
//correct buttons depending on admin or regular user
function handleLogin(data) {
	token = data.authToken;
	userId = data.user.id;
	admin = data.user.admin;
	$('.js-search-all-users').hide();
	if (admin) {
		$('.js-search-all-users').show();
	}
	console.log(data.user.admin);
	$('#js-form').hide();
	$('.js-back').hide();
	$('.js-button-list').show();
}

//callback function shows confirmation of successful creation
//of user account
function displaySignUpData(data) {
	$('.js-form').hide();
	let customerInfo = 
	`<h2 class='message-header'>Sign up successful!</h2> 
		<p>Your user name is: <b>${data.username}</b><br>
		--Contact info-- <br>
		Email: <b>${data.contactInfo.email}</b><br>
		Phone Number: <b>${data.contactInfo.phoneNumber}</b></p>`;
	$('#js-form').hide();
	$('.js-confirm').show();
	$('.js-confirm').html(customerInfo);
}

//callback function, confirms appointment schedule info
function displayRepairScheduleInfo(data) {
	$('#js-form').hide();
	$('.js-confirm').show();
	$('.js-confirm').html(`<h2 class='message-header'>Appointment details</h2>
		<p>Your vehicle is scheduled for repair on: 
		<b>${moment(data.repairInfo.date).format('MMM Do YYYY')}</b><br>
		You have a complaint of: <b>${data.repairInfo.description}</b></p>`);
}

//callback function, confirms new contact info
function displayNewContactInfo(data) {
	$('#js-form').hide();
	$('.js-confirm').show();
	$('.js-confirm').html(`<h2 class='message-header'>Updated Info</h2>
		<p>Your new phone number is: <b>${data.contactInfo.phoneNumber}</b><br>
		Your new email is: <b>${data.contactInfo.email}</b></p>`);
}

function renderSignUpForm() {
	return `
		<h2 class='form-header'>Create A New User Account</h2>
		<form class="js-sign-up-form">
			<fieldset name="contact-info">
				<legend><h2>Contact Info</h2></legend>
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
		    	<legend><h2>User Info</h2></legend>
		    	<label for="username">Username</label>
		        <input type="text" id="username" placeholder="Username" required>
		        <br>
		        <label for="password">Password</label>
		        <input type="text" id="password" placeholder="Password" required>
		    </fieldset>
		    <button type="submit" class="submit-button">Submit</button>
	    </form>`;
}

function renderSignInForm() {
	return `
		<h2 class='form-header'>Sign Into Your Account</h2>
		<form class="js-sign-in-form">
			<fieldset name="User Info">
		    	<legend><h2>User Info</h2></legend>
		    	<label for="usernameIn">Username</label>
		        <input type="text" id="usernameIn" placeholder="Username" required>
		        <br>
		        <label for="passwordIn">Password</label>
		        <input type="text" id="passwordIn" placeholder="Password" required>
		    </fieldset>
		    <button type="submit" class="submit-button">Submit</button>
		</form>`;
}

function renderScheduleForm() {
	return `
		<h2 class='form-header'>Schedule A New Appointment</h2>
		<form class="js-schedule-form">
			<fieldset name="Repair Info">			
				<legend><h2>Repair Info</h2></legend>
				<label for="date">Date</label>
				<input type="Date" id="date" required>
				<br>
				<label for="description">Description of problem</label>
				<input type="text" id="description" required>
				<br>
				<legend><h2>Vehicle Info</h2></legend>
				<label for="year">Year</label>
				<input type="Number" id="year" required>
				<br>
				<label for="make">Make</label>
				<input type="text" id="make" required>
				<br>
				<label for="model">Model</label>
				<input type="text" id="model" required>
				<br>	
			</fieldset>
			<button type="submit" class="submit-button">Submit</button>
		</form>`;
}

function renderContactForm() {
	return `
		<form class="js-contact-form">
			<fieldset name="contact-info">
				<legend><h2 class='form-header'>Update Contact Info</h2></legend>
		        <label for="emailNew">Email</label>
		        <input type="email" id="emailNew" placeholder="your@email.com">
		        <br>
		        <label for="phoneNew">Phone #</label>
		        <input type="tel" pattern="[0-9/-]*" id="phoneNew" placeholder="444-444-4444" required>  
		    </fieldset>
		    <button type="submit" class="submit-button">Submit</button>
	    </form>`;
}

function displayContactForm() {
	$('#js-form').html(renderContactForm);
}

function displayScheduleForm() {
	$('#js-form').html(renderScheduleForm);
}

function displaySignInForm() {
	$('#js-form').html(renderSignInForm);
}

function displaySignUpForm() {
	$('#js-form').html(renderSignUpForm);
}

//function that handles sign up button click on sign up form
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
		postDataToUserApi(userData, displaySignUpData);
	});
}

//function that handles sign in button click on sign in form
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

//function that handles submit button on form to schedule repair
function handleScheduleSubmitClick() {
	$('.js-schedule-form').submit(function(event) {
		event.preventDefault();
		const date = $('#date').val();
		const description = $('#description').val();
		const year = $('#year').val();
		const make = $('#make').val();
		const model = $('#model').val();
		$('#date').val('');
		$('#description').val('');
		$('#year').val('');
		$('#make').val('');
		$('#model').val('');
		console.log(description);
		const userData = {
			id: userId,
			date: date,
			vehicleInfo: {
				year: year,
				make: make,
				model: model
			},
			description: description
		}
		putRepairDataToUserApi(userData, displayRepairScheduleInfo);
	});
}

//function to handle submit button on form to update user contact info
function handleUpdateContactSubmit() {
	$('.js-contact-form').submit(function(event) {
		event.preventDefault();
		const phoneNumber = $('#phoneNew').val();
		const email = $('#emailNew').val();
		console.log(email);
		$('#phoneNew').val('');
		$('#emailNew').val('');
		const userData = {
			id: userId,
			contactInfo: {
				phoneNumber: phoneNumber,
				email: email
			}
		}
		putRepairDataToUserApi(userData, displayNewContactInfo);
	});
}

//handles click on update contact info button, displays contact form
//and runs form submit function
function handleUpdateButtonClick() {
	$('.js-update-contact').on('click', function(event) {
		console.log('update contact click');
		$('.js-button-list').hide();
		$('#js-form').show();
		$('.js-sign-in-back').show();
		displayContactForm();
		handleUpdateContactSubmit();
	});
}

//handles click on schedule appointment button, displays schedule
//form and runs form submit function
function handleScheduleButtonClick() {
	$('.js-schedule-button').on('click', function(event) {
		console.log('schedule button click');
		$('.js-button-list').hide();
		$('#js-form').show();
		$('.js-sign-in-back').show();
		displayScheduleForm();
		handleScheduleSubmitClick();
	});
}

//handles delete your account button, runs function to delete account
function handleDeleteUserButtonClick() {
	$('.js-delete-user').on('click', function(event) {
		if (confirm("Are you sure you want to delete your account?")) {
			deleteDataFromUserAPI(displayConfirmDelete);
		}
	});
}

function handleLogoutButtonClick() {
	$('.js-logout').on('click', function(event) {
		if (confirm("You are about to logout!")) {
			$('.js-copyright').show();
			$('.js-description').show();
			$('.js-sign-up').show();
			$('.js-sign-in').show();
			$('#js-form').hide();
			$('.js-button-list').hide();
			$('.js-confirm').hide();
			$('.js-sign-in-back').hide();
			$('.js-info-list').hide();
		};
	});
}

//handles back button click on page once already signed in
//shows initial page seen after user first signs in
function handleSignBackButtonClick() {
	$('.js-sign-in-back').on('click', function(event) {
		$('.js-sign-in-back').hide();
		$('#js-form').hide();
		$('.js-info-list').hide();
		$('.js-confirm').hide();
		$('.js-button-list').show();
	});
}

//handles back button click on home page
function handleBackButtonClick() {
	$('.js-back').on('click', function(event) {
		$('.js-button-list').hide();
		console.log('back pressed');
		$('.js-copyright').show();
		$('.js-description').show();
		$('.js-sign-up').show();
		$('.js-sign-in').show();
		$('.js-info-list').hide();
		$('#js-form').hide();
		$('.js-back').hide();
		$('.js-error').hide();
		$('.js-confirm').hide();

	});
}

//handles search all users button, only displayed for admin user 
function handleSearchUsersButton() {
	$('.js-search-all-users').on('click', function(event) {
		console.log('hello2');
		getDataFromUserAPI(displayUserData);
		$('.js-button-list').hide();
		$('.js-confirm').hide();
		$('.js-sign-in-back').show();
		$('.js-info-list').show();
	});
}

//handles search show repair schedule button, will display repair
//data history for specific user by id
function handleSearchUserIdButton() {
	$('.js-repair-history').on('click', function(event) {
		getDataFromUserIdAPI(displayUserIdData);
		$('.js-button-list').hide();
		$('.js-confirm').hide();
		$('.js-sign-in-back').show();
		$('.js-info-list').show();
	});
}

//displays sign in form and runs form submit button after sign in
//button click
function handleSignInButtonClick() {
	$('.js-sign-in').on('click', function(event) {
		$('.js-copyright').hide();
		$('.js-sign-in').hide();
		$('.js-sign-up').hide();
		$('.js-description').hide();
		console.log('sign in click');
		$('.js-back').show();
		$('#js-form').show();
		displaySignInForm();
		handleSubmitInButtonClick();
	});
}

//displays sign up form after sign up button clicked and 
//handles submit button for the form
function handleSignUpButtonClick() {
	$('.js-sign-up').on('click', function(event) {
		console.log('sign up click');
		$('.js-copyright').hide();
		$('.js-description').hide();
		$('.js-sign-up').hide();
		$('.js-sign-in').hide();
		$('.js-back').show();
		$('#js-form').show();
		displaySignUpForm();
		handleSubmitButtonClick();
	});
}

//hides elements not meant to be seen on home page
function hideElements() {
	$('.js-confirm').hide();
	$('.js-error').hide();
	$('#js-form').hide();
	$('.js-info-list').hide();
	$('.js-button-list').hide();
	$('.js-back').hide();
	$('.js-sign-in-back').hide();
}

function runApp() {
	hideElements();
	handleUpdateButtonClick();
	handleScheduleButtonClick();
	handleSignInButtonClick();
	handleSignUpButtonClick();
	handleSearchUsersButton();
	handleSearchUserIdButton();
	handleBackButtonClick();
	handleLogoutButtonClick();
	handleSignBackButtonClick();
	handleDeleteUserButtonClick();
}

$(runApp);