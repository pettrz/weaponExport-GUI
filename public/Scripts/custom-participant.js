//PARTICIPANTS

//Define request to get stats from database with api
var xhttpLogos = new XMLHttpRequest();
xhttpLogos.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var xhttpLogosList = JSON.parse(xhttpLogos.response);

    //Creates logosList from database
    for (var i = 0; i < xhttpLogosList.length; i++) {  
        logosList.push(xhttpLogosList[i]);
    }
    
    //Runs images function
    CreateLogos(xhttpLogosList);
    }
}

//Sends correct data from database
xhttpLogos.open('GET', 'http://localhost:1137/participants', true);
xhttpLogos.send();

//Viewmodel for statistics - creates variables for clicked element
function viewModelLogo() {
    self = this;
    self.logosList = ko.observableArray();
    self.selectedLogo = ko.observable({logo:''});
  
    self.titleInfo = ko.computed(function() {
        return self.selectedLogo().participantTitle 
    });
     self.logosInfo = ko.computed(function(){
         return self.selectedLogo().info
     });
     self.logoImg = ko.computed(function(){
         return self.selectedLogo().img
     });
    self.linksLogos = ko.computed(function(){
        return self.selectedLogo().logoLinks
    });
}
//Applies viewModel for participants.html
ko.applyBindings(viewModelLogo, document.getElementById("participants"));

//Checks if selectedCountry contains links - returns readMore depending on content
function checkLinksParticipants(){
    if(linksLogos()!=undefined){
      if(linksLogos().length==1){
        if(linksLogos()[0].logoLink=="" && linksLogos()[0].logoTitle==""){
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
  
    }
    else{
      return false;
    }
  }

function CreateLogos(request){
    
    //Creates an array for each variable
    var participantTitle = [];
    var img = [];
    
    //Creates all participant titles and imgs from database
    for (i = 0; i < request.length; i++) {
        participantTitle[i] = request[i].participantTitle.toString();
        img[i] = request[i].img;
    }
}


//Handles click event when a image is clicked
function openInfobox(el){

    //Changes infoboc
    changeInfobox()

    // Scroll to top animation onclick
    $("#logoInfo").animate({
        scrollTop: 0
    }, 200);

    var image = el;
    var attribute = image.getAttribute("src");

    //Creates selectedLogo for clicked image
    for(var i=0; i<logosList().length; i++){
        if(logosList()[i].img==attribute){
            selectedLogo(logosList()[i]);
            return;
        }
    }
}
