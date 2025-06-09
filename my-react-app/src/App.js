import React, { useState } from 'react';

// Header component present on all pages
const Header = ({ setCurrentPage }) => {
    return (
        <header className="bg-amber-800 text-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="text-2xl font-bold">FIX-A-BIKE</div>
                    <div className="hidden md:block px-6 py-2 rounded-md text-center text-sm font-semibold">
                        Your Trusted Neighborhood Bike Shop
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <button onClick={() => setCurrentPage('home')} className="hover:bg-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</button>
                        <button onClick={() => setCurrentPage('book')} className="hover:bg-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</button>
                        <button onClick={() => setCurrentPage('bookings')} className="hover:bg-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Your Bookings</button>
                        <button onClick={() => setCurrentPage('contact')} className="hover:bg-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact Us</button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <img alt=''
                        src="https://d1nymbkeomeoqg.cloudfront.net/photos/26/22/383685_21601_XL.jpg"  
                        className="rounded-lg shadow-xl w-full h-auto object-cover"
                    />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Our Location</h3>
                        <p className="text-gray-600">123 Bike Lane, Ottawa, ON K1H 8M5</p>
                        <p className="text-gray-600">Open Mon-Sat, 9am - 6pm</p>
                    </div>
                </div>
                <div className="bg-amber-100/50 p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-4xl font-extrabold text-amber-900 mb-4">About Us</h2>
                    <p className="text-lg text-gray-700 mb-2">
                        We're a small team of cyclists devoted to helping others in the community have a good time by keeping their bikes repaired! With over 10 years of experience, we handle nearly all issues and customizations when it comes to bicycles. Book with us, and your bike is in good hands.
                    </p>
                    <p className='text-lg text-amber-900 font-bold mb-8'>Designed by Victor and Matthew</p>
                    <button 
                        onClick={() => setCurrentPage('book')}
                        className="bg-green-600 text-white font-bold py-4 px-10 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-300 ease-in-out text-xl"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

// Booking Page Component
const BookingPage = ({ handleBooking, setCurrentPage }) => {
    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('basic-tune-up');
    const [error, setError] = useState('');
    
    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const bikeServices = {
        'basic-tune-up': { name: 'Basic Tune-Up', price: 75 },
        'general-tire-repair': { name: 'General Tire Repair', price: 25 },
        'brake-adjustment': { name: 'Brake Adjustment', price: 40 },
        'custom-build': { name: 'Custom Bike Building', price: 250 },
    };
    
    const availableTimes = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const generateCalendarDays = () => {
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const daysArray = [];

        // Add blank days for the start of the month
        for (let i = 0; i < startDay; i++) {
            daysArray.push(null);
        }

        // Add actual days
        for (let i = 1; i <= totalDays; i++) {
            daysArray.push(i);
        }
        return daysArray;
    };

    const calendarDays = generateCalendarDays();
    
    const isPastDay = (day) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return checkDate < today;
    };

    const handleDateSelect = (day) => {
        if (day && !isPastDay(day)) {
            setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
            setSelectedTime(null); // Reset time when new date is picked
        }
    };
    
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !service || !selectedDate || !selectedTime) {
            setError('Please fill out all fields and select a date and time.');
            return;
        }
        setError('');
        const bookingData = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            phone,
            service: bikeServices[service],
            date: selectedDate,
            time: selectedTime,
        };
        handleBooking(bookingData);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Book a Bike Repair</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column: User Details */}
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
                         <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Your Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone # (Optional)</label>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                            <select id="service" value={service} onChange={e => setService(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2">
                                {Object.entries(bikeServices).map(([key, { name, price }]) => (
                                    <option key={key} value={key}>{name} - ${price}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Column: Calendar and Time */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="bg-amber-200 p-4 rounded-lg">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <button type="button" onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-amber-300 transition-colors">
                                    &lt;
                                </button>
                                <h3 className="font-bold text-lg text-amber-900">
                                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button type="button" onClick={handleNextMonth} className="p-2 rounded-full hover:bg-amber-300 transition-colors">
                                    &gt;
                                </button>
                            </div>
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="font-semibold text-gray-600">{day}</div>
                                ))}
                                {calendarDays.map((day, index) => (
                                    <button 
                                        type="button" 
                                        key={index} 
                                        onClick={() => handleDateSelect(day)}
                                        className={`p-2 rounded-full transition-colors ${
                                            !day ? 'cursor-default' : 
                                            isPastDay(day) ? 'text-gray-400 cursor-not-allowed' : 
                                            selectedDate?.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() ? 'bg-amber-800 text-white' : 
                                            'hover:bg-amber-300'
                                        }`}
                                        disabled={!day || isPastDay(day)}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Selection */}
                        {selectedDate && (
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-800">Available Times for {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                    {availableTimes.map(time => (
                                        <button 
                                            type="button"
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-2 rounded-md border-2 transition-colors text-sm ${
                                                selectedTime === time ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 hover:border-green-500'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                 {/* Action Buttons */}
                <div className="mt-8 text-center">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-center gap-4">
                        <button type="button" onClick={() => setCurrentPage('home')} className="bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-400 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

// Confirmation Page Component
const ConfirmationPage = ({ bookingDetails }) => {
    if (!bookingDetails) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-red-600">Something went wrong. No booking details found.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-xl">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-4 text-3xl font-extrabold text-green-700">Your appointment has been confirmed!</h2>
                <p className="mt-4 text-gray-600">
                    Thank you, <span className="font-bold">{bookingDetails.firstName}</span>. You will receive an email confirmation shortly.
                </p>
                <div className="mt-6 text-left bg-green-50/50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Appointment Summary:</h3>
                    <p className="text-gray-700"><strong>Service:</strong> {bookingDetails.service.name}</p>
                    <p className="text-gray-700"><strong>Date:</strong> {bookingDetails.date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-700"><strong>Time:</strong> {bookingDetails.time}</p>
                </div>
                <p className="mt-6 text-gray-500">
                    You can view your bookings at any time in the "Your Bookings" tab.
                </p>
            </div>
        </div>
    );
};

// Bookings Page Component
const BookingsPage = ({ allBookings }) => {
    const [email, setEmail] = useState('');
    const [foundBookings, setFoundBookings] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        const bookingsForEmail = allBookings.filter(booking => booking.email.toLowerCase() === email.toLowerCase());
        setFoundBookings(bookingsForEmail);
        setSearched(true);
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-amber-900 mb-4">Find Your Bookings</h2>
                <p className="text-center text-gray-600 mb-6">Please enter your email to see your bookings.</p>
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" 
                    />
                    <button onClick={handleSearch} className="bg-amber-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition-colors">
                        Find
                    </button>
                </div>
            </div>

            {searched && (
                <div className="max-w-2xl mx-auto mt-8">
                    {foundBookings.length > 0 ? (
                        <div className="space-y-4">
                             <h3 className="text-xl font-bold text-gray-800">Your Upcoming Appointments:</h3>
                            {foundBookings.map(booking => (
                                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
                                    <p><strong>Service:</strong> {booking.service.name}</p>
                                    <p><strong>Date:</strong> {booking.date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })} at {booking.time}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No bookings found for that email address.</p>
                    )}
                </div>
            )}
        </div>
    );
};

//Contact Us Page Component
const ContactPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) {
      setError('Please fill out both the email and message section.');
      return;
    }
    setError('');
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className ="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-lg mx-auto bg-white p-10 rounded-lg shadow-xl">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h2 className="mt-4 text-3xl font-extrabold text-green-700">Message Sent!</h2>
          <p className="mt-4 text-gray-600">
            Thanks for the message! We'll get back to you at <span className="font-bold">{email}</span> as soon as possible.
          </p>
          <button onClick = {() => setCurrentPage('home')} className="mt-8 bg-amber-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-700 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-2">Contact Us</h2>
        <p className="text-center text-gray-600">Have a question? Send us a message!</p>
        <p className="text-center text-gray-600 mb-8">613-123-4567 fixabike@gmail.com</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input type="email" id="contact-email" value={email} onChange={e => setEmail(e.target.value)} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:romg-amber-500 sm:text-sm p-2" 
            placeholder="you@example.com"/>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows="6" value={message} onChange= {e => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
            placeholder="Ask us anything!"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-center">
            <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'book', 'confirmation', 'bookings'
    const [allBookings, setAllBookings] = useState([]);
    const [currentBookingDetails, setCurrentBookingDetails] = useState(null);

    const handleBooking = (bookingData) => {
        setAllBookings(prevBookings => [...prevBookings, bookingData]);
        setCurrentBookingDetails(bookingData);
        setCurrentPage('confirmation');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'book':
                return <BookingPage handleBooking={handleBooking} setCurrentPage={setCurrentPage} />;
            case 'confirmation':
                return <ConfirmationPage bookingDetails={currentBookingDetails} />;
            case 'bookings':
                return <BookingsPage allBookings={allBookings} />;
            case 'contact':
                return <ContactPage setCurrentPage={setCurrentPage} />;
            case 'home':
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-amber-50 min-h-screen font-sans">
            <Header setCurrentPage={setCurrentPage} />
            <main>
                {renderPage()}
            </main>
        </div>
    );
}
