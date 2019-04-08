 
      // Initial array of animals
      var animals= ["Cat", "Dog", "Rabbit", "Hamster", "Goldfish", "Racoon", "Fish", "Birds", "Anaconda", "Crocodiles", "Sharks" ,  "Snakes", "Flys"];
      
      // displayAnimalInfo function re-renders the HTML to display the appropriate content
      function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=rMFkZ2mz1XKsOws6HWePoWTFDFUt2wlk&limit=10";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response)
               
         $("#animals-view").empty();
         for (i=0; i< response.data.length; i++) {
        // Creating a div to hold the animal
        var animalDiv = $("<div class='animal'>");
        var rating1 = response.data[i].rating;
        var pOne = $("<p>").text("Rating: " +  rating1);
        // Displaying the rating
        animalDiv.append(pOne);
         
          var image = '<img src= " ' + response.data[i].images.fixed_height_downsampled.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height_downsampled.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';
 
          // Appending the image
          animalDiv.append(image);

          // Putting the entire animal above the previous animals
          $("#animals-view").append(animalDiv);
           
         /// check imagestate

        $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
            if (state == 'still') {
              $(this).attr('src', $(this).attr("data-animate"));
              $(this).attr('data-state', 'animate');
            } else {
              $(this).attr('src', $(this).attr("data-still"));
              $(this).attr('data-state', 'still');
            }
          });
        }
              
        });
       
      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animal prior to adding new animals
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
           var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }



      
       
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
      });
       
      // Adding a click event listener to all elements with a class of "animal-btn"
     $(document).on("click", ".animal-btn", displayAnimalInfo);
        
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
       

   