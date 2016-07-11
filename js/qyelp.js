showYelpInfo = function(yelp_id, openInfowindow){
    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }            
    var yelp_url = "https://api.yelp.com/v2/business/" + yelp_id;
    // yelp keys
    var YELP_KEY = "8vGgNg_wQ9tKrhrmN-CUzQ";
    var YELP_KEY_SECRET = "djAFHxZ3c93ggZCUKDpTT3j0usU";
    var YELP_TOKEN = "z0WPJFOxNCwCA0o0jmkOO8oinBscMi0Y";
    var YELP_TOKEN_SECRET = "_EvZ3v4jgf58FJlWw67hfWF4o-0";
    
    var parameters = {
        oauth_consumer_key: YELP_KEY,
        oauth_token: YELP_TOKEN,
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now()/1000),
        oauth_signature_method: "HMAC-SHA1",
        oauth_version : "1.0",
        callback: "cb"           // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate("GET",yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
        timeout: 2000,
        dataType: "jsonp",
        success: function(yelp_result) {
            // store yelp results into totalResults array
            openInfowindow(yelp_result.snippet_text);
        },
        fail: function(xhr, status, error) {
            console.log("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);
            alert("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);            
        },
        error: function(xhr, status, error) {
            console.log("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);
            alert("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);            
        }
    };
    // Send AJAX query via jQuery library.
    $.ajax(settings);
};