
/*================================================================
=>                   Factory = <%= cameledName %>
==================================================================*/
/*global app*/

app.factory('<%= cameledName %>', ['<%= inject %>', function (<%= inject %>) {

	'use strict';

<% if (options['api']) { %>
	return $resource('/xxx', {}, {

		getXXX: {
			method: 'GET',
			params: {
			}
		}
	});
<% } else { %>

	return {
	    func : function () {

	    }
	};
<% } %>
}]);


/*-----  End of Factory = <%= cameledName %>  ------*/
