var app = angular.module('myApp', []).controller('userCtrl', function($scope) {

  $scope.offers = [
  {
    "_id": null,
    "buttonActions": [
      "2"
    ],
    "buttonTitles": [
      "COPY CODE AND BOOK TICKET"
    ],
    "country": "INDIA",
    "description": "Flat Rs.100 OFF",
    "detailsBody": "1. Offer Code is RBAPP100\n2. Flat Rs 100 discount. Discount valid on a minimum transaction of Rs 300.\n3. Valid for 1st time transaction and only on mobile application\n4. Offer Valid only for 1 transaction. Valid until 31 August 2015\n5. Offer cannot be clubbed with any other offer\n6. Offer not valid on mobile web,desktop site,Cash On Delivery and phone booking\n7. Redbus reserves the right in its sole discretion to interpret, modify or discontinue the Offer or to restrict its availability to any person, at any time, for any or no reason and without prior notice or liability.\n8. This Offer is available and applicable only for individual booking, strictly for bus operations in India.\n9. Any dispute arising out of or in connection with or as a result of this Offer will be subject to the exclusive jurisdiction of the courts in Bangalore.\n",
    "detailsTitle": "Terms and conditions",
    "footer": "offer valid for a limited period only",
    "offerCode": "RBAPP100",
    "offerId": "1",
    "phoneImageUrl": "http://st.redbus.in/Images/pricePloy/rbapp100_detail_phone.png",
    "tabletImageUrl": "http://st.redbus.in/Images/pricePloy/rbapp100_detail_tablet.png",
    "thumbnailUrl": "http://st.redbus.in/Images/pricePloy/rbapp100_thumbnail.png",
    "title": "Redbus App Offer",
    "validFrom": "09-09-2014",
    "validTo": "31-08-2015"
  },
  {
    "_id": null,
    "buttonActions": [
      "2"
    ],
    "buttonTitles": [
      "COPY CODE AND BOOK TICKET"
    ],
    "country": "INDIA",
    "description": "Flat Rs 150 Off!",
    "detailsBody": "1. Flat Rs 150 off on bus tickets. Use code: RBIND150\n2. Discount of Rs. 50 per transaction on a minimum transaction of Rs 400\n3. Additional Rs. 100 off on paying through PayUmoney\n4. Valid only thrice per user for the booking period – 13th Aug to 21th Aug 2015 \n5. Offer cannot be clubbed with any other offer\n6. This offer is not valid on State RTCs and some private operators\n7. Redbus reserves the right in its sole discretion to interpret, modify or discontinue the Offer or to restrict its availability to any person, at any time, for any or no reason and without prior notice or liability.\n8. This Offer is available and applicable only for individual booking, strictly for bus operations in India.\n9. Any dispute arising out of or in connection with or as a result of this Offer will be subject to the exclusive jurisdiction of the courts in Bangalore.\n",
    "detailsTitle": "How it works",
    "footer": "offer valid for a limited period only",
    "offerCode": "RBIND150",
    "offerId": "2",
    "phoneImageUrl": "http://st.redbus.in/Images/MobileOffers/rs150_mobile.png",
    "tabletImageUrl": "http://st.redbus.in/Images/MobileOffers/rs150_tablet.png",
    "thumbnailUrl": "http://st.redbus.in/Images/MobileOffers/rs50_thumbnail.png",
    "title": "Independence Day Sale!",
    "validFrom": "14-08-2015",
    "validTo": "21-08-2015"
  },
  {
    "_id": null,
    "buttonActions": [
      "2"
    ],
    "buttonTitles": [
      "COPY CODE AND BOOK TICKET"
    ],
    "country": "INDIA",
    "description": "Upto Rs 225 off!",
    "detailsBody": "1. Upto 35% off on “Track my bus” bookings. Look for the icon on the search results screen. Use code: RBTMB35\n2. Maximum discount of Rs. 125 per transaction on a minimum transaction of Rs 400\n3. Additional Rs. 100 off on paying through PayUmoney\n4. Valid only once per user and for the booking period – 11th Aug to 31st Aug 2015 \n5. Offer cannot be clubbed with any other offer\n6. This offer is not valid on State RTCs and some private operators\n7. Redbus reserves the right in its sole discretion to interpret, modify or discontinue the Offer or to restrict its availability to any person, at any time, for any or no reason and without prior notice or liability.\n8. This Offer is available and applicable only for individual booking, strictly for bus operations in India.\n9. Any dispute arising out of or in connection with or as a result of this Offer will be subject to the exclusive jurisdiction of the courts in Bangalore.\n",
    "detailsTitle": "How it works",
    "footer": "offer valid for a limited period only",
    "offerCode": "RBTMB35",
    "offerId": "3",
    "phoneImageUrl": "http://st.redbus.in/Images/MobileOffers/TMBmobile35.png",
    "tabletImageUrl": "http://st.redbus.in/Images/MobileOffers/TMBtablet35.png",
    "thumbnailUrl": "http://st.redbus.in/Images/MobileOffers/TMBthumbnail35.png",
    "title": "Track My Bus Offer!",
    "validFrom": "11-08-2015",
    "validTo": "31-08-2015"
  }
];

$scope.install = function(offerId) {

    window.location.href = "editOffer.html";
}
 
});
