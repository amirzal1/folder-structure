var app = angular.module("contactTree", []);


app.directive('tree', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        contacts: '=src' // create an isolated scope variable 'contacts' and pass 'src' to it.
      },    
      template: '<ul><branch ng-repeat="contact in contacts" src="contact"></branch></ul>'
    };
  });

  
  app.directive('branch', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
          contact: '=src' // create an isolated scope variable 'contact' and pass 'src' to it.  
      },    
      template: '<li><a>{{ contact.name }}</a></li>',
      link: function(scope, element) {
        var has_contacts = angular.isArray(scope.contact.contacts);
        //// adding elements to DOM for more contacts
        if (has_contacts) {        
          element.append('<tree src="contact.contacts"></tree>');
          element.addClass('collapsed');
          // recompile Angular because of manual appending
           var linking =  $compile(element.contents());
           linking(scope);
        }

        //binds click event on each element, while checking if there are contacts inside while stop the events from acting on parents
        element.on('click', function(event) {
            event.stopPropagation();
            if (has_contacts) {
              element.toggleClass('collapsed'); //removing the class, so user can see the content
              element.toggleClass('mark');
            }
        });      
      }
    };
  });

  var contacts = [
    {
        id: 1,
        name: "Friends",
        type: "Group",
        contacts: [
            { id: 2, name: "Udi", type: "Contact" },
            { id: 3, name: "Tommy", type: "Contact" },
            {
                id: 6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    { id: 7, name: "Itay", type: "Contact"}
                ]
            }
        ]
    },
      {
          id:4,
          name: "Family",
          type: "Group",
          contacts: [
              {id:5, name: "Roni", type: "Contact"}
          ]
      },
      { id: 8, name: "Ori", type: "Contact" }
];


//controller of the app, since we use directive here then only the data from the json object is being pulled
app.controller("contactTreeCtrl", function ($scope) {
    $scope.contacts = contacts;
});
        