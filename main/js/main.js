
// Screen loader
setTimeout(function () {
	if (document.readyState === 'loading') {  // Loading hasn't finished yet
	  document.addEventListener('DOMContentLoaded', function () {
		document.querySelector(".loader-container").classList.add("no-display");
  
	  });
	} //Loading has already finished
	else if(document.readyState === "complete" || document.readyState === "interactive" || document.readyState === "loaded"){
	  console.log(" HTML loaded");
	  document.querySelector(".loader-container").classList.add("no-display"); //Get rid of the loader
	}
  }, 600);
  
  // Checking SVG support
  var svgSupport = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
  
  if (!(svgSupport)) {
  
	  let allSvg = document.getElementsByTagName("svg");
  
	  for (let svg of allSvg) {
		  svg.classList.add("no-display");
		  svg.classList.add("hide-svg");
	  }
  
	  let allSvgFallback = document.querySelectorAll(".svg-fallback");
  
	  for (let png of allSvgFallback) {
		  png.classList.remove("no-display");
		  png.classList.remove("hide-png");
	  }
  }

var general = {
	main: document.querySelector(".main-content"),
	backdrops: document.querySelectorAll(".backdrop"),
	closeButtons: document.querySelectorAll(".modal__close"),
	navTitle: document.querySelector(".nav__title")
}

var helper = { 
	touched: false,
	counter: 0,
	trappedObject: null,
	errorCounts: [],

	openModal(modal){
		helper.trap();
		modal.classList.add("show");
		modal.firstElementChild.classList.add("show");
		modal.firstElementChild.setAttribute("aria-hidden", "false");
	},
	closeModal(modal){
		modal.classList.remove("show");	
		modal.firstElementChild.classList.remove("show");
		modal.firstElementChild.setAttribute("aria-hidden", "true");
		helper.trappedObject.focus();
	},
	touch(){
		helper.touched = true;
	},
	untouch(){
		helper.touched = false;
	},
	trap(){
		helper.trappedObject = document.activeElement;
	},
	// Clear all error messages
	clearErrors(){
		let textFields = document.querySelectorAll(".text-field");
		for (let i = 0; i < textFields.length; i++) {
			
			textFields[i].classList.remove("invalid");

			let error = textFields[i].parentNode.querySelector(".modal-error-message");
			if(error !== null && error !== undefined) {
				error.parentNode.removeChild(error);
				helper.errorCounts[i] = 0;
			}
		}	
	},
	// Clear all empty field error messages
	clearEmptyErrors(){
		
		let textFields = document.querySelectorAll(".text-field");
		for (let i = 0; i < textFields.length; i++) {
			if (textFields[i].value === "") {
				textFields[i].classList.remove("invalid");

				let error = textFields[i].parentNode.querySelector(".modal-error-message");
					if(error !== null && error !== undefined) {
						error.parentNode.removeChild(error);
						helper.errorCounts[i] = 0;
					}
			}
		}
	}
	
};

var addModal = {
	backdrop: document.getElementById("add-backdrop"),
	close: document.getElementById("add-close"),
	content: document.getElementById("add-content"),
	title: document.getElementById("book-title-field"),
	author: document.getElementById("book-author-field"),
	pages: document.getElementById("book-pages-field"),
	checkbox: document.getElementById("read-checkbox"),
	submit: document.getElementById("book-submit"),
	
	// Clear all input fields
	clearForm(){
		addModal.title.value = "";
		addModal.author.value = "";
		addModal.pages.value = "";
		addModal.checkbox.checked = false;
	},
	// Verify before submitting the form
	verifyThenSubmit(){
		helper.clearErrors();

		// Count the number of empty and invalid fields
		let empty = 0;
		let invalid = 0;

		{//Listeners for the text fields
		
		let textFields = document.querySelectorAll(".text-field");
		for(let i = 0; i < textFields.length; i++) {

				if(textFields[i].value === "") {

					textFields[i].classList.add("invalid");
					textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); 
					helper.errorCounts[i]++;
					empty++;
				}

				// Check if it's the page number text field
				if(textFields[i] === document.querySelector("#book-pages-field")) {
					if(textFields[i].value <= 0 && textFields[i].value !== "") {

						textFields[i].classList.add("invalid");
						textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`); 
						helper.errorCounts[i]++;
						invalid++;
					}
				}

			}
		}
		// Abort if there are empty or invalid fields
		if(empty != 0 || invalid != 0) {
			return;
		}

		// Submit if there are no errors
		bookList.renderRow(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
		addModal.clearForm();
		helper.closeModal(addModal.backdrop);

		
	}

}
addModal.tabbables = addModal.content.querySelectorAll("input, [tabindex='-1']");


var bookList = { 
	addButton: document.getElementById("add-book"),
	table: document.getElementById("books-list-1"),
	tableBody: document.querySelector(".books-list-body"),
	library: [],
	Book: function(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	},
	createBookRow(title, author, pages, read){
				
			let item = document.createElement("tr");
			item.classList.add("books-row");
			item.classList.add("books-item");
			item.insertAdjacentHTML("beforeend", `
                    <td class="books-number"></td>
                    <td class="books-title">${title}</td>
                    <td class="books-author">${author}</td>
                    <td class="books-pages">${pages}</td>
                    `);
		
			if(read === false) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0" aria-label="not read, toggle to change to read" role="button">
							<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon">
						</div>	
					</td>`);
				
			}
			else if(read === true) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0" aria-label="read, toggle to change to not read" role="button">
							<img class="books-read-icon read" src="main/images/check.png" alt="check icon">
						</div>
					</td>`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
            		<div class="books-delete-container" tabindex="0" aria-label="delete this book" role="button">
                        <img class="delete-png" src="main/images/delete.png" alt="Trash bin">
                    </div>
                </td>`);
        	return item;
	},
	toggleReadIcon(readContainer, readIcon, newBook){
		if (readIcon.classList.contains("read")) {
			// Make it look like it's not read
			readIcon.classList.remove("read");
			readIcon.classList.add("not-read");
			readIcon.setAttribute("src", "main/images/x-icon.png");
			readIcon.setAttribute("alt", "X icon");
			// Urgent: replace icon to container
			readContainer.setAttribute("aria-label", "not read, toggle to change to read");
			readContainer.setAttribute("role", "button");
		}
		else if (readIcon.classList.contains("not-read")) {
			// Make it look like it's not read
			readIcon.classList.remove("not-read");
			readIcon.classList.add("read");
			readIcon.setAttribute("src", "main/images/check.png");
			readIcon.setAttribute("alt", "check icon");
			readContainer.setAttribute("aria-label", "read, toggle to change to not read");
			readContainer.setAttribute("role", "button");
			}
		newBook.toggleRead();
		var firebaseRef = firebase.database().ref();
		firebaseRef.child("library").set(JSON.stringify(bookList.library));		
		// localStorage.setItem("library", JSON.stringify(bookList.library));

	},
	createDeleteModal(newBook, item){
				let deleteModal = document.createElement("div");
				deleteModal.classList.add("backdrop");
				
				deleteModal.setAttribute("id", "delete-backdrop");
				deleteModal.insertAdjacentHTML("beforeend", `
					<section class="modal-container" id="delete-modal" tabindex="0" role="dialog" aria-hidden="false">
                		<div class="modal__close" id="delete-close" tabindex="-1" role="button" aria-label="close button">
                    		<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                        	<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src="main/images/close.svg" width="90" height="90" alt="Close Button"/>
                    		</svg>
                    		<img class="hide-png no-display svg-fallback modal__close-png" src="main/images/close.png" alt="Close Button">
                		</div>
                		<h1 class="modal-header">Delete this Book</h1>
                		<p class="modal-paragraph">Are you sure you want to remove this book from the list?</p>
                		<div class="button-container">
                    		<button class="modal-button" id="cancel-modal-button">Cancel</button>
                    		<button class="modal-button" id="delete-modal-button">Delete</button>
                		</div>
                	</section>`);

				// Exit the modal when you press escape
					deleteModal.querySelector("#delete-modal").addEventListener("keydown", function(event){
						if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
							helper.trappedObject.focus();
						}
						else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
							event.preventDefault();
							deleteModal.querySelector(".modal__close").focus();
						}
					});

				

				// Enable tabbing Through the delete modal
				{
					let tabbables = deleteModal.querySelectorAll("button, div[tabindex='-1']");
					for(let i = 0; i < tabbables.length; i++) {
						tabbables[i].addEventListener("keydown", function(event){
							event.stopPropagation();
							if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}
							else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
								event.preventDefault();
								let previous = i - 1;

								if(previous < 0) {
									tabbables[tabbables.length - 1].focus();

								}
								else{
									tabbables[previous].focus();
								}
							}
							else if(event.key === "Tab" || event.which === 9 || event.keyCode === 9) {
								event.preventDefault();	
								let next = i + 1;

								if(next === tabbables.length) {
									tabbables[0].focus();

								}
								else{
									tabbables[next].focus();
								}
							}
						});

					}
				}

				// Close the delete modal when clicking the delete buttonAs well as delete the row and book item
				function focusAfterDelete() {
					let deleteIcon = item.querySelector(".books-delete-container");
					let deleteIcons = document.querySelectorAll(".books-delete-container");
					for(let i = 0; i < deleteIcons.length; i++) {
						if(deleteIcons[i] === deleteIcon && i !== 0) {
							let previous = i - 1;
							deleteIcons[previous].focus();
							return;
						}
					}
					general.navTitle.focus();
				}
				function confirmDeleteModal() {
						focusAfterDelete();
						bookList.tableBody.removeChild(item);
						bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1);
						var firebaseRef = firebase.database().ref();
						firebaseRef.child("library").set(JSON.stringify(bookList.library));	
						// localStorage.setItem("library", JSON.stringify(bookList.library));
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);
						helper.touch();
				};

				setTimeout(function(){
					deleteModal.querySelector("#delete-modal-button").addEventListener("touchstart", function(){
						confirmDeleteModal();
						helper.touch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							confirmDeleteModal();
						}
						helper.untouch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("keydown", function(event){
						if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
							confirmDeleteModal();
						}
					});
				}, 0);
                
				setTimeout(function(){ 
					deleteModal.querySelector("#cancel-modal-button").addEventListener("touchstart", function(){
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);
						helper.trappedObject.focus();
						helper.touch();
					});

					deleteModal.querySelector("#cancel-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
							helper.trappedObject.focus();
						}						
					helper.untouch();
					});

					deleteModal.querySelector("#cancel-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}
					});
				}, 0);

                setTimeout(function(){ 
					deleteModal.addEventListener("touchstart", function(event){
						if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
							helper.trappedObject.focus();
						}
						helper.touch();	
					});
	
					deleteModal.addEventListener("click", function(event){
						if(!(helper.touched)) {
							if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}
						}
						helper.untouch();
					});
				}, 0);
				setTimeout(function(){ 
					deleteModal.querySelector("#delete-close").addEventListener("touchstart", function(event){
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);
						helper.trappedObject.focus();
						helper.touch();	
					});

					deleteModal.querySelector("#delete-close").addEventListener("click", function(event){
						if(!(helper.touched)) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
						}
						helper.untouch();
					});
				}, 0);
				helper.trap();
				general.main.appendChild(deleteModal);
				deleteModal.classList.add("show");
				document.querySelector("#delete-modal").focus();

	},
	renderRow(title, author, pages, read){
		// To prevent bottleneck
		setTimeout(function(){ 
			// At the book to the HTML document
			let item = bookList.createBookRow(title, author, pages, read);
			            
            // Add the book to the array
            let newBook = new bookList.Book(title, author, pages, read);

            // Unique counter system so each book has its unique value
            newBook.counter = helper.counter;
            helper.counter++;

			bookList.library.push(newBook);
			var firebaseRef = firebase.database().ref();
			firebaseRef.child("library").set(JSON.stringify(bookList.library));
			// localStorage.setItem("library", JSON.stringify(bookList.library));

			let readContainer = item.querySelector(".books-read-container");
			let readIcon = item.querySelector(".books-read-icon");
			setTimeout(function(){
				readContainer.addEventListener("touchstart", function(){
					bookList.toggleReadIcon(readContainer, readIcon, newBook);

					helper.touch();
				});
			}, 0);
			setTimeout(function(){ 
				readContainer.addEventListener("click", function(){
					if(!(helper.touched)) {
						bookList.toggleReadIcon(readContainer, readIcon, newBook);
					}
			
					helper.untouch();
				});
			}, 0);

			setTimeout(function(){ 
				readContainer.addEventListener("keydown", function(event){
					if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
						bookList.toggleReadIcon(readContainer, readIcon, newBook);
					}
				
				});
			}, 0);
			
			let deleteIcon = item.querySelector(".books-delete-container");

			deleteIcon.addEventListener("touchstart", function(){
				event.preventDefault();
				bookList.createDeleteModal(newBook, item);
				helper.touch();
			});
			deleteIcon.addEventListener("click", function(){
				if(!(helper.touched)) {
					bookList.createDeleteModal(newBook, item);
				
				}
				helper.untouch();
			});
			deleteIcon.addEventListener("keydown", function(event){
				if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
					bookList.createDeleteModal(newBook, item);
					}	
			});
			bookList.tableBody.appendChild(item);
		}, 0);
			
	},
	
	renderLibrary(library){
		// let counter = 1;
		for (let book of library){
			bookList.renderRow(book.title, book.author, book.pages, book.read);
		}
	},

};

bookList.Book.prototype.toggleRead = function () {
	this.read = !(this.read);
}

setTimeout(function(){
	bookList.addButton.addEventListener("touchstart", function(){
		event.preventDefault();
		helper.trap();
		helper.openModal(addModal.backdrop);
		addModal.content.focus();
		helper.touch();
	});
	
	bookList.addButton.addEventListener("click", function(){
		if(!(helper.touched)) {
			helper.trap();
			helper.openModal(addModal.backdrop);
			addModal.content.focus();
		}
		helper.untouch();
		
	});
}, 0);

setTimeout(function(){
	// Intended general modal backdrop closer
	for(let i = 0; i < general.backdrops.length; i++) {
		general.backdrops[i].addEventListener("touchstart", function(event){
			if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
			helper.touch();	
		});

		general.backdrops[i].addEventListener("click", function(event){
			if(!(helper.touched)) {

				if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
					helper.clearEmptyErrors();
					helper.closeModal(general.backdrops[i]);
				}
			}
			helper.untouch();
		});
	}
}, 0);

setTimeout(function(){
	// General close button modal closer
	for(let i = 0; i < general.closeButtons.length; i++) {
		general.closeButtons[i].addEventListener("touchstart", function(event){
			helper.clearEmptyErrors();
			helper.closeModal(general.backdrops[i]);
			helper.touch();	
		});

		general.closeButtons[i].addEventListener("click", function(event){
			if(!(helper.touched)) {
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
			helper.untouch();
		});
		general.closeButtons[i].addEventListener("keydown", function(event){
			if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
		});

	}
}, 0);


setTimeout(function(){
	// Enable escape button when focusing add modal
	addModal.content.addEventListener("keydown", function(event){
		if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
			helper.closeModal(addModal.backdrop);
		}
		else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				document.getElementById("add-close").focus();
		}
	});
}, 0);

setTimeout(function(){
	// Enable tab scrolling in the add modal
	for(let i = 0; i < addModal.tabbables.length; i++) {
		addModal.tabbables[i].addEventListener("keydown", function(event){
			event.stopPropagation();	
			if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
				helper.closeModal(addModal.backdrop);		
			}
			else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				let previous = i - 1;
				if(previous < 0) {
					addModal.tabbables[addModal.tabbables.length - 1].focus();
				}		
				else{
					addModal.tabbables[previous].focus();
				}
			}
			else if(event.key === "Tab" || event.which === 9 || event.keyCode === 9) {
				event.preventDefault();
				let next = i + 1;
				if(next === addModal.tabbables.length) {
					addModal.tabbables[0].focus();
				}
				else{
					addModal.tabbables[next].focus();
				}
			}
		});
	}		
}, 0);


setTimeout(function () {
	//Listeners for the text fields
	let textFields = document.querySelectorAll(".text-field");
	for(let i = 0; i < textFields.length; i++) {
		helper.errorCounts[i] = 0;
		textFields[i].addEventListener("blur", function(){
			if(helper.errorCounts[i] !== 0) {
				let error = textFields[i].parentNode.querySelector(".modal-error-message");
				textFields[i].parentNode.removeChild(error);			
				helper.errorCounts[i] = 0;
			}
			if(textFields[i].value === "") {
				textFields[i].classList.add("invalid");
				textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); 
				helper.errorCounts[i]++;
			}

			// Check if it's the page number text field
			if(textFields[i] === document.querySelector("#book-pages-field")) {
				if(textFields[i].value <= 0 && textFields[i].value !== "") {
					textFields[i].classList.add("invalid");
					textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`); 
					helper.errorCounts[i]++;
				}
			}
		});
		textFields[i].addEventListener("focus", function(){
			textFields[i].classList.remove("invalid");
		});
	}
}, 0);

// Submit listener for the modal form
addModal.submit.addEventListener("touchstart", function(event){
	event.preventDefault();
	addModal.verifyThenSubmit();
	helper.touch();
});

addModal.submit.addEventListener("click", function(event){
	if(!(helper.touched)) {
		event.preventDefault();
		addModal.verifyThenSubmit();		
		
	}
	helper.untouch();
});

addModal.submit.addEventListener("keydown", function(event){
	if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
		event.preventDefault();
		addModal.verifyThenSubmit();
	}
});

setTimeout(function(){
	// Retrieve the library from storage and render it
	var temporary = {
		// library: JSON.parse(localStorage.getItem("library")),
		library: []
	}

	var firebaseLibraryRef = firebase.database().ref().child("library");
	firebaseLibraryRef.on('value', function(datasnapshot){
		temporary.library = JSON.parse(datasnapshot.val());
		console.log(datasnapshot.val());
	});
	
	console.log(`Stored library contains:`);
	console.log(temporary.library);

	setTimeout(function(){ 
		// Check if the library has any contents before rendering
		if(temporary.library) {
			bookList.renderLibrary(temporary.library);
		} 
	}, 0);
}, 0);



