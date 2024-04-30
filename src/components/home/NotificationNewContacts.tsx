function NotificationNewContacts() {
    return(
        <div className="w-full h-16 px-4 bg-[#128C7E] flex flex-col items-end justify-center text-white">
                <span className="h-5 w-5 rounded-full bg-[#25D366] text-white relative top-3 grid place-content-center">1</span>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 18.77v-1h1.616V9.845q0-1.96 1.24-3.447T11 4.546V3h2v1.546q1.904.366 3.144 1.853t1.24 3.447v7.923H19v1zm6.997 2.615q-.668 0-1.14-.475t-.472-1.14h3.23q0 .67-.475 1.142q-.476.472-1.143.472"></path>
                    </svg>
                </button>
        </div> 
    )
}
export default NotificationNewContacts;