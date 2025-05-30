class FridayChatbot {
    constructor() {
        this.isRepeat = false;
        this.currentSongIndex = 0;
        this.timerInterval = null;
        this.audioPlayerChat = document.getElementById('audio-player-chat');
        this.audioPlayerContainerChat = document.getElementById('audio-player-container-chat');
        this.songTitleChat = document.getElementById('song-title-chat');
        this.playPauseBtnChat = document.getElementById('play-pause-btn-chat');
        this.timerDisplay = document.getElementById('timer-display');
        
        this.playlist = [
            { title: "Samajavaragamana", url: "https://www.dropbox.com/scl/fi/hyk0j59j1cuuebg602ivd/Samajavaragamana.mp3?rlkey=ebt7ly8g7ykt9hqhiodrjtek1&st=edlhb53z&dl=1" },
            { title: "Bagundu Bagundu Song", url: "https://www.dropbox.com/scl/fi/cbg9hxehlvcm0rvkcbae6/Bagundu-Bagundu.mp3?rlkey=yru56be3o6kefmetbfflzl89q&st=p31u7ndh&dl=1" },
            { title: "diwali song", url: "https://www.dropbox.com/scl/fi/s33wdxoduevh7z5vt4psd/Diwali-2018-Special-Song.mp3?rlkey=3clfvgx0vusnhn5mrxdhduddq&st=tevo3hjz&dl=1" },
            { title: "mother song", url: "https://www.dropbox.com/scl/fi/ch771ywkuh9qdlu04vl1s/Emotional-Mother-Song.mp3?rlkey=qg7i9omp8hwu7ijp29iusprwx&st=3gkz3wlm&dl=1" },
            { title: "Aradhya song", url: "https://www.dropbox.com/scl/fi/rqeg1abtqta4p7rk789dt/Aradhya.mp3?rlkey=jirtlk9cn8ajftns2uvxkdk8j&st=08kx9d5p&dl=1" },
            { title: "Bullettu-Bandi", url: "https://www.dropbox.com/scl/fi/q5hf2wx0pok0lckevk047/Bullettu-Bandi.mp3?rlkey=25wkb9m963tez217f1zycs4h0&st=eb4j1rmu&dl=1" },
            { title: "Sommasilli-Pothunnave", url: "https://www.dropbox.com/scl/fi/1x8aojrcdgyl2w07f2mil/Sommasilli-Pothunnave.mp3?rlkey=d1fiepn90xla8ejnuz5ea5ev3&st=njig3nzv&dl=1" },
            { title: "Sandalle-Sandalle", url: "https://www.dropbox.com/scl/fi/ejrri7nrczlrt7h45v6yz/Sandalle-Sandalle.mp3?rlkey=8b56ztjffhv01ffctp849rrdm&st=igs10au5&dl=1" },
            { title: "Vachindamma", url: "https://www.dropbox.com/scl/fi/ma70fw9mhkb14rszqd6s5/Vachindamma.mp3?rlkey=w0tcuncbxmffiqgoui9oj3v3a&st=8oj1qhpj&dl=1" },
            { title: "Selayeru-Paduthunte", url: "https://www.dropbox.com/scl/fi/n0sizn8rzlrwg4np1xm0d/Selayeru-Paduthunte.mp3?rlkey=ztroxizel2hlz048rrd9d2koz&st=q9byexeg&dl=1" }
        ];

        this.context = null; // Store the last command for follow-up actions
        this.contextTimeout = null; // Initialize context timeout
        this.contextAttempts = 0; // Track number of follow-up attempts
        
        this.responses = {
            greetings$hi: [
                "Hi sir! How can I assist you today?",
                "Hello sir! Is there anything I can help you with?",
                "Good to see you, sir! How are you doing today?",
                "Greetings sir! How may I be of service?"
            ],
            greetings$hello: [
                "Hello sir! What can I do for you today?",
                "Hi sir! Is there anything else I can assist you with?",
                "Hello sir! I hope you're doing well."
            ],

            
            greetings$howareyou: [
                "I'm doing well, sir. How about you?",
                "I'm great, thank you for asking! How are you today, sir?",
                "I'm functioning perfectly, sir. How are you feeling?",
                "I'm here and ready to assist, sir. How are you doing?",
                "All systems are running smoothly, sir! How are you?",
                "I'm fine, sir. I hope you're having a good day.",
                "Always ready to help, sir. How can I assist you today?",
                "I'm doing fine, thank you. Let me know how I can help you, sir."
            ],

           greetings$whatareyoudoing: [
            "I'm always here, ready to assist you, sir.",
            "Hello sir! I'm standing by for your next command.",
            "Hi sir! I'm waiting for your instructions."
        ],
        greetings$whoareyou: [
            "I'm Friday, your virtual assistant, created by Mr. Hemanthravi. I'm here to help you with anything you need.",
            "My name is Friday. I’m a smart assistant designed by Mr. Hemanthravi, built to assist you efficiently.",
            "I'm Friday — a digital assistant built by Mr. Hemanthravi, proudly working under the OpenPageFriday project at K.EHBM.",
            "Greetings! I’m Friday — a smart assistant running on custom logic developed by Mr. Hemanthravi, designed to enhance your digital experience.",
            "I am Friday: a conversational AI built by Mr. Hemanthravi. I operate under OpenPageFriday, a tech wing of K.EHBM.",
            "I'm Friday, your intelligent assistant. Powered by purpose, coded with care by Mr. Hemanthravi, and part of the OpenPageFriday system."
            ],






            gemini1: [
                "Yes sir, Opening Gemini AI.",
                "Got it sir, Opening Gemini AI!",
                "Ok sir, Launching Gemini.",
                "Yes sir, Opening Gemini AI right now!"
            ],
            googleTranslate2: [
                "Yes sir, Opening Google Translate for you!",
                "Got it sir, Opening Google Translate!",
                "Ok sir, Launching Google Translate.",
                "Yes sir, Opening Google Translate right now!"
            ],
            googleDrive3: [
                "Yes sir, Opening Google Drive for you!",
                "Got it sir, Opening Google Drive!",
                "Ok sir, Launching Google Drive.",
                "Yes sir, Opening Google Drive right now!"
            ],
            googleMeet4: [
                "Yes sir, Opening Google Meet for you!",
                "Got it sir, Opening Google Meet!",
                "Ok sir, Launching Google Meet.",
                "Yes sir, Opening Google Meet right now!"
            ],
            gmail5: [
                "Yes sir, Opening Gmail for you!",
                "Got it sir, Opening Gmail!",
                "Ok sir, Launching Gmail.",
                "Yes sir, Opening Gmail right now!"
            ],
            playstore6: [
                "Yes sir, Opening Google Play Store for you!",
                "Got it sir, Opening Google Play Store!",
                "Ok sir, Launching Google Play Store.",
                "Yes sir, Opening Google Play Store right now!"
            ],
            googleMaps7: [
                "Yes sir, Opening Google Maps for you!",
                "Got it sir, Opening Google Maps!",
                "Ok sir, Launching Google Maps.",
                "Yes sir, Opening Google Maps right now!"
            ],
            googleNews8: [
                "Yes sir, Opening Google News for you!",
                "Got it sir, Opening Google News!",
                "Ok sir, Launching Google News.",
                "Yes sir, Opening Google News right now!"
            ],
            googleChat9: [
                "Yes sir, Opening Google Chat for you!",
                "Got it sir, Opening Google Chat!",
                "Ok sir, Launching Google Chat.",
                "Yes sir, Opening Google Chat right now!"
            ],
            googleCalendar10: [   
                "Yes sir, Opening Google Calendar for you!",
                "Got it sir, Opening Google Calendar!",
                "Ok sir, Launching Google Calendar.",
                "Yes sir, Opening Google Calendar right now!"
            ],
            googlePhotos11: [
                "Yes sir, Opening Google Photos for you!",
                "Got it sir, Opening Google Photos!",
                "Ok sir, Launching Google Photos.",
                "Yes sir, Opening Google Photos right now!"
            ],
            googleShopping12: [
                "Yes sir, Opening Google Shopping for you!",
                "Got it sir, Opening Google Shopping!",
                "Ok sir, Launching Google Shopping.",
                "Yes sir, Opening Google Shopping right now!"
            ],
            googleFinance13: [
                "Yes sir, Opening Google Finance for you!",
                "Got it sir, Opening Google Finance!",
                "Ok sir, Launching Google Finance.",
                "Yes sir, Opening Google Finance right now!"
            ],
            googleSheets14: [
                "Yes sir, Opening Google Sheets for you!",
                "Got it sir, Opening Google Sheets!",
                "Ok sir, Launching Google Sheets.",
                "Yes sir, Opening Google Sheets right now!"
            ],
            googleSlides15: [
                "Yes sir, Opening Google Slides for you!",
                "Got it sir, Opening Google Slides!",
                "Ok sir, Launching Google Slides.",
                "Yes sir, Opening Google Slides right now!"
            ],
            googleDocs16: [
                "Yes sir, Opening Google Docs for you!",
                "Got it sir, Opening Google Docs!",
                "Ok sir, Launching Google Docs.",
                "Yes sir, Opening Google Docs right now!"
            ],
            googleBooks17: [
                "Yes sir, Opening Google Books for you!",
                "Got it sir, Opening Google Books!",
                "Ok sir, Launching Google Books.",
                "Yes sir, Opening Google Books right now!"
            ],
            googleScholar18: [
                "Yes sir, Opening Google Scholar for you!",
                "Got it sir, Opening Google Scholar!",
                "Ok sir, Launching Google Scholar.",
                "Yes sir, Opening Google Scholar right now!"
            ],
            googleBlogger19: [
                "Yes sir, Opening Google Blogger for you!",
                "Got it sir, Opening Google Blogger!",
                "Ok sir, Launching Google Blogger.",
                "Yes sir, Opening Google Blogger right now!"
            ],
            googlekeep20: [
                "Yes sir, Opening Google Keep for you!",
                "Got it sir, Opening Google Keep!",
                "Ok sir, Launching Google Keep.",
                "Yes sir, Opening Google Keep right now!"
            ],
            googleEarth21: [
                "Yes sir, Opening Google Earth for you!",
                "Got it sir, Opening Google Earth!",
                "Ok sir, Launching Google Earth.",
                "Yes sir, Opening Google Earth right now!"
            ],
            googleClassroom22: [
                "Yes sir, Opening Google Classroom for you!",
                "Got it sir, Opening Google Classroom!",
                "Ok sir, Launching Google Classroom.",
                "Yes sir, Opening Google Classroom right now!"
            ],
            googleAds23: [
                "Yes sir, Opening Google Ads for you!",
                "Got it sir, Opening Google Ads!",
                "Ok sir, Launching Google Ads.",
                "Yes sir, Opening Google Ads right now!"
            ],
            googleTravels24: [
                "Yes sir, Opening Google Travels for you!",
                "Got it sir, Opening Google Travels!",
                "Ok sir, Launching Google Travels.",
                "Yes sir, Opening Google Travels right now!"
            ],
            googleForms25: [
                "Yes sir, Opening Google Forms for you!",
                "Got it sir, Opening Google Forms!",
                "Ok sir, Launching Google Forms.",
                "Yes sir, Opening Google Forms right now!"
            ],
            chromeWebStore26: [
                "Yes sir, Opening Chrome Web Store for you!",
                "Got it sir, Opening Chrome Web Store!",
                "Ok sir, Launching Chrome Web Store.",
                "Yes sir, Opening Chrome Web Store right now!"
            ],
            googlePasswords27: [
                "Yes sir, Opening Google Passwords for you!",
                "Got it sir, Opening Google Passwords!",
                "Ok sir, Launching Google Passwords.",
                "Yes sir, Opening Google Passwords right now!"
            ],


            //SEARCH ENGINES
            microsoftBing28: [
                "Yes sir, Opening Microsoft Bing for you!",
                "Got it sir, Opening Microsoft Bing!",
                "Ok sir, Launching Microsoft Bing.",
                "Yes sir, Opening Microsoft Bing right now!"
            ],
            googlesearch29: [
                "Yes sir, Opening Google for you!",
                "Got it sir, Opening Google!",
                "Ok sir, Launching Google.",
                "Yes sir, Opening Google right now!"
            ],
            outlook30: [
                "Yes sir, Opening Outlook for you!",
                "Got it sir, Opening Outlook!",
                "Ok sir, Launching Outlook.",
                "Yes sir, Opening Outlook right now!"
            ],
            yahoo31: [
                "Yes sir, Opening Yahoo Mail for you!",
                "Got it sir, Opening Yahoo Mail!",
                "Ok sir, Launching Yahoo Mail.",
                "Yes sir, Opening Yahoo Mail right now!"
            ],

            // SOCIAL MEDIA
            facebook32: [
                "Yes sir, Opening Facebook for you!",
                "Got it sir, Opening Facebook!",
                "Ok sir, Launching Facebook.",
                "Yes sir, Opening Facebook right now!"
            ],
            instagram33: [
                "Yes sir, Opening Instagram for you!",
                "Got it sir, Opening Instagram!",
                "Ok sir, Launching Instagram.",
                "Yes sir, Opening Instagram right now!"
            ],
            twitter34: [
                "Yes sir, Opening X (Twitter) for you!",
                "Got it sir, Opening X (Twitter)!",
                "Ok sir, Launching X (Twitter).",
                "Yes sir, Opening X (Twitter) right now!"
            ],
            linkedin35: [
                "Yes sir, Opening LinkedIn for you!",
                "Got it sir, Opening LinkedIn!",
                "Ok sir, Launching LinkedIn.",
                "Yes sir, Opening LinkedIn right now!"
            ],
            reddit36: [
                "Yes sir, Opening Reddit for you!",
                "Got it sir, Opening Reddit!",
                "Ok sir, Launching Reddit.",
                "Yes sir, Opening Reddit right now!"
            ],
            //shopping
            amazon37: [
                "Yes sir, Opening Amazon for you!",
                "Got it sir, Opening Amazon!",
                "Ok sir, Launching Amazon.",
                "Yes sir, Opening Amazon right now!"
            ],
            flipkart38: [
                "Yes sir, Opening Flipkart for you!",
                "Got it sir, Opening Flipkart!",
                "Ok sir, Launching Flipkart.",
                "Yes sir, Opening Flipkart right now!"
            ],

            myntra39: [
                "Yes sir, Opening Myntra for you!",
                "Got it sir, Opening Myntra!",
                "Ok sir, Launching Myntra.",
                "Yes sir, Opening Myntra right now!"
            ],
            ajio40: [
                "Yes sir, Opening Ajio for you!",
                "Got it sir, Opening Ajio!",
                "Ok sir, Launching Ajio.",
                "Yes sir, Opening Ajio right now!"
            ],
            snapdeal41: [
                "Yes sir, Opening Snapdeal for you!",
                "Got it sir, Opening Snapdeal!",
                "Ok sir, Launching Snapdeal.",
                "Yes sir, Opening Snapdeal right now!"
            ],
            meesho42: [
                "Yes sir, Opening Meesho for you!",
                "Got it sir, Opening Meesho!",
                "Ok sir, Launching Meesho.",
                "Yes sir, Opening Meesho right now!"
            ],
            nykaa43: [
                "Yes sir, Opening Nykaa for you!",
                "Got it sir, Opening Nykaa!",
                "Ok sir, Launching Nykaa.",
                "Yes sir, Opening Nykaa right now!"
            ],
            makerbazar44: [
                "Yes sir, Opening Maker Bazar for you!",
                "Got it sir, Opening Maker Bazar!",
                "Ok sir, Launching Maker Bazar.",
                "Yes sir, Opening Maker Bazar right now!"
            ],

            //VIDEO & STREAMING 
            youtube45: [
                "Yes sir, Opening YouTube for you!",
                "Got it sir, Opening YouTube!",
                "Ok sir, Launching YouTube.",
                "Yes sir, Opening YouTube right now!"
            ],
            hotstar46: [
                "Yes sir, Opening Hotstar for you!",
                "Got it sir, Opening Hotstar!",
                "Ok sir, Launching Hotstar.",
                "Yes sir, Opening Hotstar right now!"
            ],
            netflix47: [
                "Yes sir, Opening Netflix for you!",
                "Got it sir, Opening Netflix!",
                "Ok sir, Launching Netflix.",
                "Yes sir, Opening Netflix right now!"
            ],
            zee548: [
                "Yes sir, Opening Zee5 for you!",
                "Got it sir, Opening Zee5!",
                "Ok sir, Launching Zee5.",
                "Yes sir, Opening Zee5 right now!"
            ],
            sonyliv49: [
                "Yes sir, Opening SonyLIV for you!",
                "Got it sir, Opening SonyLIV!",
                "Ok sir, Launching SonyLIV.",
                "Yes sir, Opening SonyLIV right now!"
            ],
            aha50: [
                "Yes sir, Opening Aha for you!",
                "Got it sir, Opening Aha!",
                "Ok sir, Launching Aha.",
                "Yes sir, Opening Aha right now!"
            ],
            sunnxt51: [
                "Yes sir, Opening Sun NXT for you!",
                "Got it sir, Opening Sun NXT!",
                "Ok sir, Launching Sun NXT.",
                "Yes sir, Opening Sun NXT right now!"
            ],
            primeVideo52: [
                "Yes sir, Opening Amazon Prime Video for you!",
                "Got it sir, Opening Amazon Prime Video!",
                "Ok sir, Launching Amazon Prime Video.",
                "Yes sir, Opening Amazon Prime Video right now!"
            ],
            

            //PRODUCTIVITY & TOOLS
            microsoftOffice53: [
                "Yes sir, Opening Microsoft Office for you!",
                "Got it sir, Opening Microsoft Office!",
                "Ok sir, Launching Microsoft Office.",
                "Yes sir, Opening Microsoft Office right now!"
            ],
            dropbox54: [
                "Yes sir, Opening Dropbox for you!",
                "Got it sir, Opening Dropbox!",
                "Ok sir, Launching Dropbox.",
                "Yes sir, Opening Dropbox right now!"
            ],
            canva55: [
                "Yes sir, Opening Canva for you!",
                "Got it sir, Opening Canva!",
                "Ok sir, Launching Canva.",
                "Yes sir, Opening Canva right now!"
            ],
            notion56: [
                "Yes sir, Opening Notion for you!",
                "Got it sir, Opening Notion!",
                "Ok sir, Launching Notion.",
                "Yes sir, Opening Notion right now!"
            ],
            onedrive57: [
                "Yes sir, Opening OneDrive for you!",
                "Got it sir, Opening OneDrive!",
                "Ok sir, Launching OneDrive.",
                "Yes sir, Opening OneDrive right now!"
            ],
            evernote58: [
                "Yes sir, Opening Evernote for you!",
                "Got it sir, Opening Evernote!",
                "Ok sir, Launching Evernote.",
                "Yes sir, Opening Evernote right now!"
            ],
            onenote59: [
                "Yes sir, Opening OneNote for you!",
                "Got it sir, Opening OneNote!",
                "Ok sir, Launching OneNote.",
                "Yes sir, Opening OneNote right now!"
            ],
            onenote59: [
                "Yes sir, Opening Microsoft OneNote for you!",
                "Got it sir, Opening Microsoft OneNote!",
                "Ok sir, Launching Microsoft OneNote.",
                "Yes sir, Opening Microsoft OneNote right now!"
            ],
            microsoftToDo60: [
                "Yes sir, Opening Microsoft To Do for you!",
                "Got it sir, Opening Microsoft To Do!",
                "Ok sir, Launching Microsoft To Do.",
                "Yes sir, Opening Microsoft To Do right now!"
            ],
            googleTask61:[
                "Yes sir, Opening Google Tasks for you!",
                "Got it sir, Opening Google Tasks!",
                "Ok sir, Launching Google Tasks.",
                "Yes sir, Opening Google Tasks right now!"
            ],


            //NEWS
            bbcNews62: [
                "Yes sir, Opening BBC News for you!",
                "Got it sir, Opening BBC News!",
                "Ok sir, Launching BBC News.",
                "Yes sir, Opening BBC News right now!"
            ],
            tv963:[
                "Yes sir, Opening TV9 News for you!",
                "Got it sir, Opening TV9 News!",
                "Ok sir, Launching TV9 News.",
                "Yes sir, Opening TV9 News right now!"
            ],
            ndtv64: [
                "Yes sir, Opening NDTV for you!",
                "Got it sir, Opening NDTV!",
                "Ok sir, Launching NDTV.",
                "Yes sir, Opening NDTV right now!"
            ],
            timesOfIndia65: [
                "Yes sir, Opening Times of India for you!",
                "Got it sir, Opening Times of India!",
                "Ok sir, Launching Times of India.",
                "Yes sir, Opening Times of India right now!"
            ],
            indaToday66: [
                "Yes sir, Opening India Today for you!",
                "Got it sir, Opening India Today!",
                "Ok sir, Launching India Today.",
                "Yes sir, Opening India Today right now!"
            ],
            theHindu67: [
                "Yes sir, Opening The Hindu for you!",
                "Got it sir, Opening The Hindu!",
                "Ok sir, Launching The Hindu.",
                "Yes sir, Opening The Hindu right now!"
            ],
            news1868: [
                "Yes sir, Opening News18 for you!",
                "Got it sir, Opening News18!",
                "Ok sir, Launching News18.",
                "Yes sir, Opening News18 right now!"
            ],
            abpNews69: [
                "Yes sir, Opening ABP News for you!",
                "Got it sir, Opening ABP News!",
                "Ok sir, Launching ABP News.",
                "Yes sir, Opening ABP News right now!"
            ],

            //EDUCATION
            khanAcademy70: [
                "Yes sir, Opening Khan Academy for you!",
                "Got it sir, Opening Khan Academy!",
                "Ok sir, Launching Khan Academy.",
                "Yes sir, Opening Khan Academy right now!"
            ],
            byjus71: [
                "Yes sir, Opening Byju's for you!",
                "Got it sir, Opening Byju's!",
                "Ok sir, Launching Byju's.",
                "Yes sir, Opening Byju's right now!"
            ],
            toppr72: [
                "Yes sir, Opening Toppr for you!",
                "Got it sir, Opening Toppr!",
                "Ok sir, Launching Toppr.",
                "Yes sir, Opening Toppr right now!"
            ],
            vedantu73: [
                "Yes sir, Opening Vedantu for you!",
                "Got it sir, Opening Vedantu!",
                "Ok sir, Launching Vedantu.",
                "Yes sir, Opening Vedantu right now!"
            ],
            unacademy74: [
                "Yes sir, Opening Unacademy for you!",
                "Got it sir, Opening Unacademy!",
                "Ok sir, Launching Unacademy.",
                "Yes sir, Opening Unacademy right now!"
            ],
            nptel75: [
                "Yes sir, Opening NPTEL for you!",
                "Got it sir, Opening NPTEL!",
                "Ok sir, Launching NPTEL.",
                "Yes sir, Opening NPTEL right now!"
            ],
            cbseAcademic76: [
                "Yes sir, Opening CBSE Academic for you!",
                "Got it sir, Opening CBSE Academic!",
                "Ok sir, Launching CBSE Academic.",
                "Yes sir, Opening CBSE Academic right now!"
            ],

            //government services
            digilocker77: [
                "Yes sir, Opening DigiLocker for you!",
                "Got it sir, Opening DigiLocker!",
                "Ok sir, Launching DigiLocker.",
                "Yes sir, Opening DigiLocker right now!"
            ],
            umang78: [
                "Yes sir, Opening UMANG for you!",
                "Got it sir, Opening UMANG!",
                "Ok sir, Launching UMANG.",
                "Yes sir, Opening UMANG right now!"
            ],
            irctc79: [
                "Yes sir, Opening IRCTC for you!",
                "Got it sir, Opening IRCTC!",
                "Ok sir, Launching IRCTC.",
                "Yes sir, Opening IRCTC right now!"
            ],
            aadhaar80: [
                "Yes sir, Opening Aadhaar for you!",
                "Got it sir, Opening Aadhaar!",
                "Ok sir, Launching Aadhaar.",
                "Yes sir, Opening Aadhaar right now!"
            ],
            incomeTax81: [
                "Yes sir, Opening Income Tax for you!",
                "Got it sir, Opening Income Tax!",
                "Ok sir, Launching Income Tax.",
                "Yes sir, Opening Income Tax right now!"
            ],
            gst82: [
                "Yes sir, Opening GST for you!",
                "Got it sir, Opening GST!",
                "Ok sir, Launching GST.",
                "Yes sir, Opening GST right now!"
            ],

            // FOOD DELIVERY
            zomato83: [
                "Yes sir, Opening Zomato for you!",
                "Got it sir, Opening Zomato!",
                "Ok sir, Launching Zomato.",
                "Yes sir, Opening Zomato right now!"
            ],
            swiggy84: [
                "Yes sir, Opening Swiggy for you!",
                "Got it sir, Opening Swiggy!",
                "Ok sir, Launching Swiggy.",
                "Yes sir, Opening Swiggy right now!"
            ],

            //MUSIC PLATFORMS
            jiosaavn85: [
                "Yes sir, Opening JioSaavn for you!",
                "Got it sir, Opening JioSaavn!",
                "Ok sir, Launching JioSaavn.",
                "Yes sir, Opening JioSaavn right now!"
            ],
            gaana86: [
                "Yes sir, Opening Gaana for you!",
                "Got it sir, Opening Gaana!",
                "Ok sir, Launching Gaana.",
                "Yes sir, Opening Gaana right now!"
            ],
            wynkMusic87: [
                "Yes sir, Opening Wynk Music for you!",
                "Got it sir, Opening Wynk Music!",
                "Ok sir, Launching Wynk Music.",
                "Yes sir, Opening Wynk Music right now!"
            ],
            hungamaMusic88: [
                "Yes sir, Opening Hungama Music for you!",
                "Got it sir, Opening Hungama Music!",
                "Ok sir, Launching Hungama Music.",
                "Yes sir, Opening Hungama Music right now!"
            ],
            raaga89: [
                "Yes sir, Opening Raaga for you!",
                "Got it sir, Opening Raaga!",
                "Ok sir, Launching Raaga.",
                "Yes sir, Opening Raaga right now!"
            ],
            youtubeMusic90: [
                "Yes sir, Opening YouTube Music for you!",
                "Got it sir, Opening YouTube Music!",
                "Ok sir, Launching YouTube Music.",
                "Yes sir, Opening YouTube Music right now!"
            ],
            appleMusic91: [
                "Yes sir, Opening Apple Music for you!",
                "Got it sir, Opening Apple Music!",
                "Ok sir, Launching Apple Music.",
                "Yes sir, Opening Apple Music right now!"
            ],
            amazonMusic92: [
                "Yes sir, Opening Amazon Music for you!",
                "Got it sir, Opening Amazon Music!",
                "Ok sir, Launching Amazon Music.",
                "Yes sir, Opening Amazon Music right now!"
            ],
            soundCloud93: [
                "Yes sir, Opening SoundCloud for you!",
                "Got it sir, Opening SoundCloud!",
                "Ok sir, Launching SoundCloud.",
                "Yes sir, Opening SoundCloud right now!"
            ],
            spotify94: [
                "Yes sir, Opening Spotify for you!",
                "Got it sir, Opening Spotify!",
                "Ok sir, Launching Spotify.",
                "Yes sir, Opening Spotify right now!"
            ],

            
            //ai-chatbots

            claude95: [
                "Yes sir, Opening Claude AI for you!",
                "Got it sir, Opening Claude AI!",
                "Ok sir, Launching Claude AI.",
                "Yes sir, Opening Claude AI right now!"
            ],
            perplexity96: [
                "Yes sir, Opening Perplexity AI for you!",
                "Got it sir, Opening Perplexity AI!",
                "Ok sir, Launching Perplexity AI.",
                "Yes sir,Opening Perplexity AI right now!"
            ],
            meta97: [   
                "Yes sir, Opening Meta AI for you!",
                "Got it sir, Opening Meta AI!",
                "Ok sir, Launching Meta AI.",
                "Yes sir, Opening Meta AI right now!"
            ],
            chatgpt98: [
                "Yes sir, Opening ChatGPT for you!",
                "Got it sir, Opening ChatGPT!",
                "Ok sir, Launching ChatGPT.",
                "Yes sir, Opening ChatGPT right now!"
            ],
           
            grok99: [
                "Yes sir, Opening Grok AI for you!",
                "Got it sir, Opening Grok AI!",
                "Ok sir, Launching Grok AI.",
                "Yes sir, Opening Grok right now!"
            ],
            deepseek100: [
                "Yes sir, Opening DeepSeek AI for you!",
                "Got it sir, Opening DeepSeek AI!",
                "Ok sir, Launching DeepSeek AI.",
                "Yes sir, Opening DeepSeek right now!"
            ],
            qwen101: [
                "Yes sir, Opening Qwen AI for you!",
                "Got it sir, Opening Qwen AI!",
                "Ok sir, Launching Qwen AI.",
                "Yes sir, Opening Qwen AI right now!"
            ],
            copilot102: [
                "Yes sir, Opening Copilot AI for you!",
                "Got it sir, Opening Copilot AI!",
                "Ok sir, Launching Copilot AI.",
                "Yes sir, Opening Copilot right now!"
            ],
            wikipedia103: [
                "Yes sir, Opening Wikipedia for you!",
                "Got it sir, Opening Wikipedia!",
                "Ok sir, Launching Wikipedia.",
                "Yes sir, Opening Wikipedia right now!"
            ],
            removebg104: [
                "Yes sir, Opening Remove.bg for you!",
                "Got it sir, Opening Remove.bg!",
                "Ok sir, Launching Remove.bg.",
                "Yes sir, Opening Remove.bg right now!"
            ],

            //writing tools
            grammarly105: [
                "Yes sir, Opening Grammarly AI for you!",
                "Got it sir, Opening Grammarly AI!",
                "Ok sir, Launching Grammarly AI.",
                "Yes sir, Opening Grammarly AI right now!"
            ],
            duolingo106: [
                "Yes sir, Opening Duolingo for you!",
                "Got it sir, Opening Duolingo!",
                "Ok sir, Launching Duolingo.",
                "Yes sir, Opening Duolingo right now!"
            ],







            //own commands
            time: [
                "Right now it’s {time}.",
                "The current time is {time}.",
                "It’s {time} at the moment.",
                "Here’s the time: {time}."
            ],
            date: [
                "Today is {date}.",
                "The date today is {date}.",
                "It’s {date} today.",
                "Here’s today’s date: {date}."
            ],
            timer: [
                "Timer set for {seconds} seconds. I’ll let you know when it’s done!",
                "Starting a {seconds}-second timer for you!",
                "Timer’s on for {seconds} seconds—sit tight!",
                "I’ve set a timer for {seconds} seconds. Wait for my ping!"
            ],
            timerDone: [
                "Timer’s up! Time to get moving!",
                "Your timer just finished!",
                "Ding! Your {seconds}-second timer is done!",
                "Timer complete—hope that helped!"
            ],
            joke: [
                "Why did the computer go to school? It wanted to improve its *byte*!",
                "Here’s a quick one: Why don’t programmers prefer dark mode? Because the light attracts bugs!",
                "What do you call fake spaghetti? An *impasta*!",
                "Why was the math book sad? It had too many problems!"
            ],
            stopthesong: [
                "Ok sir, Stopping the song now!",
                "Yes sir, stopping the song!",
                "Alright Sir, stoping the music for you!"
            ],








            //responses for conversation facilities
            whatsMyIp: [
                "I can’t access your IP directly, but you can check it by searching 'what's my IP' on Google! Want me to open Google for you?"
            ],
            confirmYes: [
                "Opening Google now!"
            ],
            confirmNo: [
                "Alright, let me know what else I can help with!"
            ],
            setAlarm: [
                "I can’t set alarms directly, but I can set a timer for you! Would you like me to set a timer?"
            ],
            confirmTimer: [
                "How many seconds or minutes for the timer? (e.g., '5 seconds' or '2 minutes')"
            ],
            invalidTimer: [
                "Please specify a number followed by 'seconds' or 'minutes' (e.g., '5 seconds' or '2 minutes'). Try again!"
            ],
            openCalculator: [
                "I can help with calculations! Want to perform a math calculation now?"
            ],
            confirmMath: [
                "Please provide a math expression like '5*5+10'."
            ],
            playGame: [
                "Want to play a quick game? I can start a number guessing game! Interested?"
            ],
            confirmGame: [
                "Great! I'm thinking of a number between 1 and 10. What's your guess?"
            ],
            unknown: [
                "I'm sorry sir, I didn't quite understand that. Could you please rephrase?",
                "Pardon me sir, I'm not sure how to respond to that. May I assist you with something else?",
                "Apologies sir, I may have missed your meaning. Could you kindly try again?",
                "I'm afraid I didn't catch that, sir. Would you mind asking in a different way?",
                "Sorry sir, I couldn't process that request. I'm here to assist—please try again.",
                "That seems unclear to me, sir. Could you please clarify?",
                "I apologize sir, I’m still learning. Can you rephrase your request?",
                "I'm not sure I understand, sir. Let me know how I can better assist you."
            ]
        };

        // Audio player event listeners
        this.audioPlayerChat.addEventListener('ended', () => {
            if (this.isRepeat) {
                this.playSong(this.currentSongIndex);
            } else {
                this.playNextSong();
            }
        });

        this.audioPlayerChat.addEventListener('play', () => {
            this.playPauseBtnChat.textContent = "Pause";
        });

        this.audioPlayerChat.addEventListener('pause', () => {
            this.playPauseBtnChat.textContent = "Play";
        });

        document.getElementById('prev-btn-chat').addEventListener('click', () => this.playPreviousSong());
        document.getElementById('next-btn-chat').addEventListener('click', () => this.playNextSong());
        document.getElementById('play-pause-btn-chat').addEventListener('click', () => {
            if (this.audioPlayerChat.paused) {
                this.resumeSong();
            } else {
                this.pauseSong();
            }
        });
        document.getElementById('repeat-btn-chat').addEventListener('click', () => this.toggleRepeat());
    }

    processInput(input) {
        const transcript = input.trim();
        const transcriptLower = transcript.toLowerCase();

        // Clear any existing context timeout
        if (this.contextTimeout) {
            clearTimeout(this.contextTimeout);
        }

        // Handle follow-up responses based on context
        if (this.context === 'whatsMyIp') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay' || transcriptLower === 'ok') {
                this.context = null;
                this.contextAttempts = 0;
                return {
                    text: this.getRandomResponse('confirmYes'),
                    action: () => window.open('https://www.google.com/search?q=what%27s+my+ip', '_blank')
                };
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'setAlarm') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'awaitingTimerDuration';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmTimer');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'awaitingTimerDuration') {
            // Allow variations like "5sec", "5 seconds", "5 min", etc.
            const timeMatch = transcriptLower.match(/(\d+)\s*(sec|seconds?|min|minutes?)/i);
            if (timeMatch) {
                const value = parseInt(timeMatch[1]);
                const unit = timeMatch[2].toLowerCase();
                let seconds = value;
                if (unit.startsWith('min')) {
                    seconds = value * 60;
                }
                this.context = null;
                this.contextAttempts = 0;
                this.setTimer(seconds);
                return this.getRandomResponse('timer').replace('{seconds}', seconds);
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "I didn't understand the timer duration. Let's try something else!";
            }
            return this.getRandomResponse('invalidTimer');
        } else if (this.context === 'openCalculator') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'awaitingMathExpression';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmMath');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'awaitingMathExpression') {
            if (transcriptLower.match(/[\d+\-*/()]+/)) {
                const mathMatch = transcriptLower.match(/[\d+\-*/()]+/);
                this.context = null;
                this.contextAttempts = 0;
                return this.solveMath(mathMatch[0]);
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "I couldn't parse that math expression. Let's try something else!";
            }
            return "Please provide a valid math expression (e.g., '5*5+10'). Try again!";
        } else if (this.context === 'playGame') {
            if (transcriptLower === 'yes' || transcriptLower === 'yep' || transcriptLower === 'sure' || transcriptLower === 'okay') {
                this.context = 'playingGame';
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmGame');
            } else if (transcriptLower === 'no') {
                this.context = null;
                this.contextAttempts = 0;
                return this.getRandomResponse('confirmNo');
            }
            this.context = null;
            this.contextAttempts = 0;
        } else if (this.context === 'playingGame') {
            const guess = parseInt(transcriptLower);
            if (!isNaN(guess) && guess >= 1 && guess <= 10) {
                this.context = null;
                this.contextAttempts = 0;
                const number = 7; // Fixed for simplicity
                if (guess === number) return "You got it! The number was 7!";
                return `Sorry, the number was 7. Want to play again?`;
            }
            this.contextAttempts++;
            if (this.contextAttempts >= 2) {
                this.context = null;
                this.contextAttempts = 0;
                return "Please guess a number between 1 and 10. Let's try something else!";
            }
            return "Please guess a number between 1 and 10. Try again!";
        }

        // Set context timeout for commands expecting follow-ups
        if (transcriptLower.includes("what's my ip") || transcriptLower.includes("whats my ip") ||
            transcriptLower.includes("set an alarm") || transcriptLower.includes("open calculator") ||
            transcriptLower.includes("i want to play game")) {
            this.contextTimeout = setTimeout(() => {
                this.context = null;
                this.contextAttempts = 0;
            }, 30000);
        }

        // Multi-search bar logic
        if (transcriptLower.startsWith('y,')) {
            const query = transcript.substring(2).trim();
            return {
                text: `Searching YouTube for "${query}"`,
                action: () => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank')
            };
        } else if (transcriptLower.startsWith('g,')) {
            const query = transcript.substring(2).trim();
            return {
                text: `Searching Google for "${query}"`,
                action: () => window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
            };
        }

        // Website opening commands
        const websiteCommands = {
            
            'gemini': { url: 'https://gemini.google.com', responseKey: 'gemini1' },
            'google gemini': { url: 'https://gemini.google.com', responseKey: 'gemini1' },
            'g,gemini': { url: 'https://gemini.google.com', responseKey: 'gemini1' },

            'translate': { url: 'https://translate.google.com', responseKey: 'googleTranslate2' },
            'google translate': { url: 'https://translate.google.com', responseKey: 'googleTranslate2' },
            'g,translate': { url: 'https://translate.google.com', responseKey: 'googleTranslate2' },    
            
            'drive': { url: 'https://drive.google.com', responseKey: 'googleDrive3' },
            'google drive': { url: 'https://drive.google.com', responseKey: 'googleDrive3' },
            'g,drive': { url: 'https://drive.google.com', responseKey: 'googleDrive3' },
            'meet': { url: 'https://meet.google.com', responseKey: 'googleMeet4' },
            
            'google meet': { url: 'https://meet.google.com', responseKey: 'googleMeet4' },
            'g,meet': { url: 'https://meet.google.com', responseKey: 'googleMeet4' },
            
            'gmail': { url: 'https://mail.google.com', responseKey: 'gmail5' },
            'google gmail': { url: 'https://mail.google.com', responseKey: 'gmail5' },
            'g,gmail': { url: 'https://mail.google.com', responseKey: 'gmail5' },

            'playstore' : { url: 'https://play.google.com/', responseKey: 'playstore6' },

            'maps': { url: 'https://www.google.com/maps', responseKey: 'googleMaps7' },
            'google maps': { url: 'https://www.google.com/maps', responseKey: 'googleMaps7' },
            'g, maps': { url: 'https://www.google.com/maps', responseKey: 'googleMaps7' },
            
            'google news': { url: 'https://news.google.com', responseKey: 'googleNews8' },
            'g, news': { url: 'https://news.google.com', responseKey: 'googleNews8' },
            
            'google chat': { url: 'https://mail.google.com/chat/', responseKey: 'googleChat9' },
            'g,chat': { url: 'https://mail.google.com/chat/', responseKey: 'googleChat9' },
            
            'google calendar': { url: 'https://calendar.google.com', responseKey: 'googleCalendar10' },
            'g,calendar': { url: 'https://calendar.google.com', responseKey: 'googleCalendar10' },

            'google photos': { url: 'https://photos.google.com', responseKey: 'googlePhotos11' },
            'g,photos': { url: 'https://photos.google.com', responseKey: 'googlePhotos11' },

            'google shopping': { url: 'https://www.google.com/shopping', responseKey: 'googleShopping12' },
            'g,shopping': { url: 'https://www.google.com/shopping', responseKey: 'googleShopping12' },

            'google finance': { url: 'https://www.google.com/finance', responseKey: 'googleFinance13' },
            'g,finance': { url: 'https://www.google.com/finance', responseKey: 'googleFinance13' },

            'google sheets': { url: 'https://sheets.google.com', responseKey: 'googleSheets14' },
            'g,sheets': { url: 'https://sheets.google.com', responseKey: 'googleSheets14' },
            
            'google slides': { url: 'https://slides.google.com', responseKey: 'googleSlides15' },
            'g,slides': { url: 'https://slides.google.com', responseKey: 'googleSlides15' },

            'google docs': { url: 'https://docs.google.com', responseKey: 'googleDocs16' },
            'g,docs': { url: 'https://docs.google.com', responseKey: 'googleDocs16' },

            'google books': { url: 'https://books.google.com', responseKey: 'googleBooks17' },
            'g,books': { url: 'https://books.google.com', responseKey: 'googleBooks17' },

            'google scholar': { url: 'https://scholar.google.com', responseKey: 'googleScholar18' },
            'g,scholar': { url: 'https://scholar.google.com', responseKey: 'googleScholar18' },

            'google blogger': { url: 'https://www.blogger.com', responseKey: 'googleBlogger19' },
            'blogger': { url: 'https://www.blogger.com', responseKey: 'googleBlogger19' },
            'g,blogger': { url: 'https://www.blogger.com', responseKey: 'googleBlogger19' },

            'google keep' : { url: 'https://keep.google.com', responseKey: 'googlekeep20' },
            'g,keep': { url: 'https://keep.google.com', responseKey: 'googlekeep20' },
            'google notes': { url: 'https://keep.google.com', responseKey: 'googlekeep20' },
            'g,notes': { url: 'https://keep.google.com', responseKey: 'googlekeep20' },

            'google earth': { url: 'https://earth.google.com', responseKey: 'googleEarth21' },
            'g,earth': { url: 'https://earth.google.com', responseKey: 'googleEarth21' },

            'google classroom': { url: 'https://classroom.google.com', responseKey: 'googleClassroom22' },
            'g,classroom': { url: 'https://classroom.google.com', responseKey: 'googleClassroom22' },

            'google ads': { url: 'https://ads.google.com', responseKey: 'googleAds23' },
            'g,ads': { url: 'https://ads.google.com', responseKey: 'googleAds23' },

            'google travels': { url: 'https://www.google.com/travel', responseKey: 'googleTravels24' },
            'g,travels': { url: 'https://www.google.com/travel', responseKey: 'googleTravels24' },

            'google forms': { url: 'https://forms.google.com', responseKey: 'googleForms25' },
            'g,forms': { url: 'https://forms.google.com', responseKey: 'googleForms25' },

            'chrome web store': { url: 'https://chrome.google.com/webstore', responseKey: 'chromeWebStore26' },
            'g,webstore': { url: 'https://chrome.google.com/webstore', responseKey: 'chromeWebStore26' },

            'google passwords': { url: 'https://passwords.google.com', responseKey: 'googlePasswords27' },
            'g,passwords': { url: 'https://passwords.google.com', responseKey: 'googlePasswords27' },



            //search engines
            'microsoft bing': { url: 'https://www.bing.com', responseKey: 'microsoftBing28' },
            'microsoft bing search': { url: 'https://www.bing.com', responseKey: 'microsoftBing28' },
            'bing': { url: 'https://www.bing.com', responseKey: 'microsoftBing28' },
            
            'google': { url: 'https://www.google.com', responseKey: 'googlesearch29' },
            'google search': { url: 'https://www.google.com', responseKey: 'googlesearch29' },
            // Emails
            'outlook': { url: 'https://outlook.live.com', responseKey: 'outlook30' },
            'outlook email': { url: 'https://outlook.live.com', responseKey: 'outlook30' },
            'outlook mail': { url: 'https://outlook.live.com', responseKey: 'outlook30' },

            'yahoo': { url: 'https://mail.yahoo.com', responseKey: 'yahoo31' },
            'yahoo mail': { url: 'https://mail.yahoo.com', responseKey: 'yahoo31' },

            //Social Media
            'facebook': { url: 'https://www.facebook.com', responseKey: 'facebook32' },
            'instagram': { url: 'https://www.instagram.com', responseKey: 'instagram33' },
            'x': { url: 'https://twitter.com', responseKey: 'twitter34' },
            'twitter': { url: 'https://twitter.com', responseKey: 'twitter34' },
            'linkedin': { url: 'https://www.linkedin.com', responseKey: 'linkedin35' },
            'reddit': { url: 'https://www.reddit.com', responseKey: 'reddit36' },
            // Shopping
            'amazon': { url: 'https://www.amazon.com', responseKey: 'amazon37' },
            'flipkart': { url: 'https://www.flipkart.com', responseKey: 'flipkart38' },
            'myntra': { url: 'https://www.myntra.com', responseKey: 'myntra39' },
            'ajio': { url: 'https://www.ajio.com', responseKey: 'ajio40' },
            'snapdeal': { url: 'https://www.snapdeal.com', responseKey: 'snapdeal41' },
            'meesho': { url: 'https://www.meesho.com', responseKey: 'meesho42' },
            'nykaa': { url: 'https://www.nykaa.com', responseKey: 'nykaa43' },
            'maker bazar': { url: 'https://www.makerbazar.com', responseKey: 'makerbazar44' },
            //Video & Streaming
            'youtube': { url: 'https://www.youtube.com', responseKey: 'youtube45' },
            'hotstar': { url: 'http://hotstar.com/in', responseKey: 'hotstar46' },
            'netflix': { url: 'https://www.netflix.com', responseKey: 'netflix47'},
            'zee5': { url: 'https://www.zee5.com', responseKey: 'zee548' },
            'sony liv': { url: 'https://www.sonyliv.com', responseKey: 'sonyliv49' },
            'aha': { url: 'https://www.aha.video', responseKey: 'aha50' },
            'sun nxt': { url: 'https://www.sunnxt.com', responseKey: 'sunnxt51' },
            'prime video': { url: 'https://www.primevideo.com', responseKey: 'primeVideo52' },
            'prime': { url: 'https://www.primevideo.com', responseKey: 'primeVideo52' },
            'amazon prime': { url: 'https://www.primevideo.com', responseKey: 'primeVideo52' },
            'amazon prime video': { url: 'https://www.primevideo.com', responseKey: 'primeVideo52' },



            //Productivity & Tools
            'microsoft office': { url: 'https://www.office.com', responseKey: 'microsoftOffice53' },
            'dropbox': { url: 'https://www.dropbox.com', responseKey: 'dropbox54' },
            'canva': { url: 'https://www.canva.com', responseKey: 'canva55' },
            'notion': { url: 'https://www.notion.so', responseKey: 'notion56' },
            'microsoft onedrive': { url: 'https://onedrive.live.com', responseKey: 'onedrive57' },
            'onedrive': { url: 'https://onedrive.live.com', responseKey: 'onedrive57' },
            'evernote': { url: 'https://www.evernote.com', responseKey: 'evernote58' },
            'microsoft one note': { url: 'https://www.onenote.com', responseKey: 'onenote59' },
            'one note': { url: 'https://www.onenote.com', responseKey: 'onenote59' },
            'microsoft to do': { url: 'https://todo.microsoft.com', responseKey: 'microsoftToDo60' },
            'google tasks': { url: 'https://tasks.google.com', responseKey: 'googleTasks61' },
            'g, tasks': { url: 'https://tasks.google.com', responseKey: 'googleTasks61' },



            //news
            'bbc news': { url: 'https://www.bbc.com/news', responseKey: 'bbcNews62' },
            'tv9': { url: 'https://www.tv9news.com', responseKey: 'tv963' },
            'ndtv': { url: 'https://www.ndtv.com', responseKey: 'ndtv64' },
            'times of india': { url: 'https://timesofindia.indiatimes.com', responseKey: 'timesOfIndia65' },
            'india today': { url: 'https://www.indiatoday.in', responseKey: 'indiaToday66' },
            'the hindu': { url: 'https://www.thehindu.com', responseKey: 'theHindu67' },
            'news18': { url: 'https://www.news18.com', responseKey: 'news1868' },
            'abp news': { url: 'https://www.abplive.com', responseKey: 'abpNews69' },


            //Education
            'khan academy': { url: 'https://www.khanacademy.org', responseKey: 'khanAcademy70' },
            'byjus': { url: 'https://www.byjus.com', responseKey: 'byjus71' },
            'toppr': { url: 'https://www.toppr.com', responseKey: 'toppr72' },
            'vedantu': { url: 'https://www.vedantu.com', responseKey: 'vedantu73' },
            'unacademy': { url: 'https://unacademy.com', responseKey: 'unacademy74' },
            'nptel': { url: 'https://nptel.ac.in', responseKey: 'nptel75' },
            'cbse academic': { url: 'https://cbseacademic.nic.in', responseKey: 'cbseAcademic76' },


            // Government Services
            'digilocker': { url: 'https://www.digilocker.gov.in', responseKey: 'digilocker77' },
            'umang': { url: 'https://web.umang.gov.in', responseKey: 'umang78' },
            'irctc': { url: 'https://www.irctc.co.in', responseKey: 'irctc79' },
            'aadhaar': { url: 'https://uidai.gov.in', responseKey: 'aadhaar80' },
            'income tax': { url: 'https://www.incometax.gov.in', responseKey: 'incomeTax81' },
            'gst': { url: 'https://www.gst.gov.in', responseKey: 'gst82' },
            'gst portal': { url: 'https://www.gst.gov.in', responseKey: 'gst82' },

            //Food Delivery
            'zomato': { url: 'https://www.zomato.com', responseKey: 'zomato83' },
            'swiggy': { url: 'https://www.swiggy.com', responseKey: 'swiggy84' },



            // Music Platforms
            'jiosaavn': { url: 'https://www.jiosaavn.com', responseKey: 'jiosaavn85' },
            'gaana': { url: 'https://gaana.com', responseKey: 'gaana86' },
            'wynk music': { url: 'https://wynk.in/music', responseKey: 'wynkMusic87' },
            'hungama music': { url: 'https://www.hungama.com/music', responseKey: 'hungamaMusic88' },
            'raaga': { url: 'https://www.raaga.com', responseKey: 'raaga89' },
            'youtube music' : { url: 'https://music.youtube.com', responseKey: 'youtubeMusic90' },
            'apple music': { url: 'https://music.apple.com/in', responseKey: 'appleMusic91' },
            'amazon music': { url: 'https://music.amazon.in', responseKey: 'amazonMusic92' },
            'soundcloud': { url: 'https://soundcloud.com', responseKey: 'soundcloud93' },
            'spotify': { url: 'https://www.spotify.com', responseKey: 'spotify94' },

    
  
            // AI Chatbots
            'claude': { url: 'https://claude.ai', responseKey: 'claude95' },
            'claude ai': { url: 'https://claude.ai', responseKey: 'claude95' },
            'perplexity': { url: 'https://www.perplexity.ai', responseKey: 'perplexity96' },
            'perplexity ai': { url: 'https://www.perplexity.ai', responseKey: 'perplexity96' },
            'meta ai': { url: 'https://www.meta.ai', responseKey: 'meta97' },
            'chatgpt': { url: 'https://chatgpt.com', responseKey: 'chatgpt98' },
            'chat gpt': { url: 'https://chatgpt.com', responseKey: 'chatgpt98' },
            'grok': { url: 'https://grok.com', responseKey: 'grok99' },
            'grok ai': { url: 'https://grok.com', responseKey: 'grok99' },
            'deepseek': { url: 'https://www.deepseek.com', responseKey: 'deepseek100' },
            'deepseek ai': { url: 'https://www.deepseek.com', responseKey: 'deepseek100' },
            'qwen': { url: 'https://chat.qwen.ai', responseKey: 'qwen101' },
            'qwen ai': { url: 'https://chat.qwen.ai', responseKey: 'qwen101' },
            'copilot': { url: 'https://copilot.microsoft.com', responseKey: 'copilot102' },
            'copilot ai': { url: 'https://copilot.microsoft.com', responseKey: 'copilot102' },
            'wikipedia': { url: 'https://www.wikipedia.org', responseKey: 'wikipedia103' },
            'remove bg': { url: 'https://www.remove.bg', responseKey: 'removeBg104' },





            //writing
            'grammarly': { url: 'https://www.grammarly.com', responseKey: 'grammarly105' },
            'grammarly ai': { url: 'https://www.grammarly.com', responseKey: 'grammarly105' },
            'duolingo': { url: 'https://www.duolingo.com', responseKey: 'duolingo106' },


        };

        for (const [key, config] of Object.entries(websiteCommands)) {
            if (transcriptLower.includes(`open ${key}`) || 
                transcriptLower.includes(`friday open ${key}`) || 
                transcriptLower.includes(`open ${key} friday`) || 
                 transcriptLower.includes(`o,${key}`) || 
                transcriptLower.includes(`friday ${key}`)) {
                return {
                    text: config.text || this.getRandomResponse(config.responseKey),
                    action: () => window.open(config.url, '_blank')
                };
            }
        }

        // Music Controls
        if (transcriptLower.includes("stop the song")) {
            return this.stopSong();
        } else if (transcriptLower.includes("play s a m song") ||transcriptLower.includes("friday play s a m song")||
        transcriptLower.includes("play s a m song friday") || transcriptLower.includes("play sam song") ||
        transcriptLower.includes("play sam song friday") || transcriptLower.includes("friday play sam song")||
        transcriptLower.includes("p-s a m")||transcriptLower.includes("p-sam")) {
            return this.playSongByTitle("Samajavaragamana");


        } else if (transcriptLower.includes("play d e p song")|| transcriptLower.includes("friday play d e p song")||
        transcriptLower.includes("play d e p song friday")||transcriptLower.includes("play dep song")||
        transcriptLower.includes("play dep song friday")||transcriptLower.includes("friday play dep song")||
        transcriptLower.includes("p-d e p")||transcriptLower.includes("p-dep")||
    //diw
    transcriptLower.includes("friday play d i w song")|| transcriptLower.includes("play d i w song")||
        transcriptLower.includes("play d i w song friday")||transcriptLower.includes("play diw song")||
        transcriptLower.includes("play diw song friday")||transcriptLower.includes("friday play diw song")||
        transcriptLower.includes("p-diw")||transcriptLower.includes("p-diw")) {
            return this.playSongByTitle("diwali song");

        } else if (transcriptLower.includes("play b a g song")|| transcriptLower.includes("friday play b a g song")||
        transcriptLower.includes("play b a g song friday")||transcriptLower.includes("play bag song")||
        transcriptLower.includes("play bag song friday")||transcriptLower.includes("friday play bag song")||
        transcriptLower.includes("p-b a g")||transcriptLower.includes("p-bag")) {
            return this.playSongByTitle("Bagundu Bagundu Song");

        } else if (transcriptLower.includes("play mother song")) {
            return this.playSongByTitle("mother song");
        } else if (transcriptLower.includes("play a r a song")|| transcriptLower.includes("friday play a r a song") ||
        transcriptLower.includes("play a r a song friday")||transcriptLower.includes("play aradhya song")||
        transcriptLower.includes("play aradhya song friday")||transcriptLower.includes("friday play aradhya song")||
        transcriptLower.includes("p-a r a")||transcriptLower.includes("p-aradhya")) {
            return this.playSongByTitle("Aradhya song");

        } else if (transcriptLower.includes("play b u l song")|| transcriptLower.includes("friday play b u l song")||
        transcriptLower.includes("play b u l song friday")||transcriptLower.includes("play bul song")||
        transcriptLower.includes("play bul song friday")||transcriptLower.includes("friday play bul song")||    
        transcriptLower.includes("p-b u l")||transcriptLower.includes("p-bul")) {
            return this.playSongByTitle("Bullettu-Bandi");

        } else if (transcriptLower.includes("play s o m song")|| transcriptLower.includes("friday play s o m song")||
        transcriptLower.includes("play s o m song friday")||transcriptLower.includes("play som song")||
        transcriptLower.includes("play som song friday")||transcriptLower.includes("friday play som song")||
        transcriptLower.includes("p-s o m")||transcriptLower.includes("p-som")) {
            return this.playSongByTitle("Sommasilli-Pothunnave");

        } else if (transcriptLower.includes("play s a n song")|| transcriptLower.includes("friday play s a n song")||
        transcriptLower.includes("play s a n song friday")||transcriptLower.includes("play san song")||
        transcriptLower.includes("play san song friday")||transcriptLower.includes("friday play san song")||
        transcriptLower.includes("p-s a n")||transcriptLower.includes("p-san")) {
            return this.playSongByTitle("Sandalle-Sandalle");

        } else if (transcriptLower.includes("play v a c song")|| transcriptLower.includes("friday play v a c song")||
        transcriptLower.includes("play v a c song friday")||transcriptLower.includes("play vac song")||
        transcriptLower.includes("play vac song friday")||transcriptLower.includes("friday play vac song")||
        transcriptLower.includes("p-v a c")||transcriptLower.includes("p-vac")) {
            return this.playSongByTitle("Vachindamma");

        } else if (transcriptLower.includes("play s e l song")|| transcriptLower.includes("friday play s e l song")||
        transcriptLower.includes("play s e l song friday")||transcriptLower.includes("play sel song")||
        transcriptLower.includes("play sel song friday")||transcriptLower.includes("friday play sel song")||
        transcriptLower.includes("p-s e l")||transcriptLower.includes("p-sel")) {
            return this.playSongByTitle("Selayeru-Paduthunte");

        } else if (transcriptLower.includes("play a song") || transcriptLower.includes("play music") || transcriptLower.includes("play song")||
            transcriptLower.includes("friday play a song") || transcriptLower.includes("friday play music") ||
            transcriptLower.includes("friday play song") || transcriptLower.includes("play a song friday") ||
            transcriptLower.includes("play music friday") || transcriptLower.includes("play song friday")||
        transcriptLower.includes("friday play song")) {
            return this.playSong(this.currentSongIndex);


            //for stoping the song
        } else if (transcriptLower.includes("pause") || transcriptLower.includes("pause song") || transcriptLower.includes("pause music") ||
        transcriptLower.includes("friday pause") || transcriptLower.includes("friday pause song") || transcriptLower.includes("friday pause music")||
        //uses "the" word in the comands
        transcriptLower.includes("friday pause the song")||transcriptLower.includes("friday pause the music")||
        //after comand friday
        transcriptLower.includes("pause friday") || transcriptLower.includes("pause song friday") || transcriptLower.includes("pause music friday")||
        transcriptLower.includes("pause the song friday")||transcriptLower.includes("pause the music friday")||
        transcriptLower.includes("stop the song friday")||transcriptLower.includes("friday stop the song")||
        transcriptLower.includes("stop the song")||transcriptLower.includes("stop song")||transcriptLower.includes("stop song friday")||
        transcriptLower.includes("friday stop song")) {
            return this.pauseSong();


            //for resuming the song
        } else if (transcriptLower.includes("resume") || transcriptLower.includes("resume song")||
        transcriptLower.includes("resume the song")||transcriptLower.includes(" friday resume") ||
        transcriptLower.includes("frday resume song")|| transcriptLower.includes("friday resume the song")||
        transcriptLower.includes("resume friday") ||transcriptLower.includes("resume song friday")||
        transcriptLower.includes("resume the song friday")||

        transcriptLower.includes("resume music") || transcriptLower.includes("resume the music")||
        transcriptLower.includes("friday resume music")|| transcriptLower.includes("resume music friday")||
        transcriptLower.includes("resume the music friday")){
            return this.resumeSong();

            //for play the next song
        } else if (transcriptLower.includes("next song") ||transcriptLower.includes("next song friday")|| transcriptLower.includes("friday next song")||
        transcriptLower.includes("play next song") ||transcriptLower.includes("play next song friday")||transcriptLower.includes("friday play next song")||
        transcriptLower.includes("play another song")||transcriptLower.includes("play another song friday") ||transcriptLower.includes("friday play another song")||
        transcriptLower.includes("another song")|| transcriptLower.includes("another song friday")||transcriptLower.includes("friday another song")||
        transcriptLower.includes("could you please play next song")|| transcriptLower.includes("could you please play next song friday")||transcriptLower.includes("friday could you please play next song")) {
            return this.playNextSong();

        //for play the previous song
        } else if (transcriptLower.includes("previous song")|| transcriptLower.includes("previous song friday")|| transcriptLower.includes("friday previous song")||
        transcriptLower.includes("play previous song") ||transcriptLower.includes("play previous song friday")||transcriptLower.includes("friday play previous song")||
        transcriptLower.includes("friday play the previous song") || transcriptLower.includes("friday play the previous song") ||
        transcriptLower.includes("before song") || transcriptLower.includes("before song friday") || transcriptLower.includes("friday before song")||
        transcriptLower.includes("play before song") || transcriptLower.includes("play before song friday") || transcriptLower.includes("friday play before song")){
            return this.playPreviousSong();

        //for repeat the song
        } else if (transcriptLower.includes("repeat song")|| transcriptLower.includes("repeat song friday")|| transcriptLower.includes("friday repeat song")||
        transcriptLower.includes("repeat the song") || transcriptLower.includes("repeat the song friday")|| transcriptLower.includes("friday repeat the song")||
        transcriptLower.includes("turn on repeat mode") || transcriptLower.includes("turn on repeat mode friday")|| transcriptLower.includes("friday turn on repeat mode")||
        transcriptLower.includes("turn on repeat") || transcriptLower.includes("turn on repeat friday")|| transcriptLower.includes("friday turn on repeat")||
        transcriptLower.includes("repeat mode on") || transcriptLower.includes("repeat mode on friday")|| transcriptLower.includes("friday repeat mode on")||
        transcriptLower.includes("repeat mode") || transcriptLower.includes("repeat mode friday")|| transcriptLower.includes("friday repeat mode")){
            return this.toggleRepeat();
        }

        // Greetings and other commands
        if (transcriptLower.includes('hi') || transcriptLower.includes('hi friday') || transcriptLower.includes("friday hi")) {
            return this.getRandomResponse('greetings$hi');

        } else if (transcriptLower.includes('hello') || transcriptLower.includes('hello friday') ||
        transcriptLower.includes("friday hello")) {
            return this.getRandomResponse('greetings$hello');

        } else if (transcriptLower.includes('how are you friday') || transcriptLower.includes('friday how are you')||
             transcriptLower.includes('how are you')){
                return this.getRandomResponse('greetings$howareyou')
             
        } else if (transcriptLower.includes('what are you doing') || transcriptLower.includes('friday what are you doing') || 
        transcriptLower.includes('what are you doing now') || transcriptLower.includes('friday what are you doing now') ||
        transcriptLower.includes("what are you doing now friday") || transcriptLower.includes("friday what are you doing now") ){
            return this.getRandomResponse('greetings$whatareyoudoing');
        } else if (transcriptLower.includes('who are you') || transcriptLower.includes('who are you tell me')||
                   transcriptLower.includes('tell me who are you')) {
            return this.getRandomResponse('greetings$whoareyou');
        }
        
        

        // Timer
        if (transcriptLower.includes('set a timer') ||
            transcriptLower.includes('friday set a timer') ){
            const timeMatch = transcriptLower.match(/set a timer for (\d+)\s*(seconds?|minutes?)/i) ||
             transcriptLower.match(/friday set a timer for (\d+)\s*(seconds?|minutes?)/i);
            if (timeMatch) {
                const value = parseInt(timeMatch[1]);
                const unit = timeMatch[2] ? timeMatch[2].toLowerCase() : 'seconds';
                let seconds = value;
                if (unit.startsWith('minute')) {
                    seconds = value * 60;
                }
                this.setTimer(seconds);
                return this.getRandomResponse('timer').replace('{seconds}', seconds);
            }
            return 'Please specify a number of seconds or minutes for the timer (e.g., "set a timer for 5 seconds" or "set a timer for 5 minutes")!';
        }

        // Time and Date
        if (transcriptLower === "time" || 
            transcriptLower.includes("tell me time") || transcriptLower.includes("whats the time now") || transcriptLower.includes("whats the time")||
            transcriptLower.includes('friday time') || transcriptLower.includes('friday tell me time'),
            transcriptLower.includes('friday whats the time now') || transcriptLower.includes('time friday') || transcriptLower.includes('tell me time friday')||
            transcriptLower.includes('whats the time now friday') ) {
            const time = this.tellTime();
            return this.getRandomResponse('time').replace('{time}', time);

        } else if (transcriptLower.includes("tell me today date") || transcriptLower.includes("today date") ||
        transcriptLower.includes("friday tell me today date") || transcriptLower.includes("friday today date")||
        transcriptLower.includes("tell me today date friday")|| transcriptLower.includes("today date friday")||
        transcriptLower.includes("what is today date friday") || transcriptLower.includes("friday what is today date")||
        transcriptLower.includes("what's today date friday") || transcriptLower.includes("friday what's today date")|| 
        transcriptLower.includes("what's today date") || transcriptLower.includes("friday whats today date")||
        transcriptLower.includes("whats today date friday") || transcriptLower.includes("friday date") || transcriptLower.includes("date friday")){
            const date = this.tellDate();
            return this.getRandomResponse('date').replace('{date}', date);
        }

        

        

        // Information Lookup
        if (transcriptLower.includes('who is') || transcriptLower.includes('what is') || 
            transcriptLower.includes('tell me about')|| transcriptLower.includes('friday who is') ||
            transcriptLower.includes('friday what is') || transcriptLower.includes('friday tell me about')) {
            const query = transcriptLower.replace(/who is|what is|tell me about|friday who is|friday what is|friday tell me about/gi, '').trim();
            return this.fetchWikipediaSummary(query);
        }

        // Math Calculations (skip if in timer or calculator context)
        if (!this.context && transcriptLower.match(/[\d+\-*/()]+/)) {
            const mathMatch = transcriptLower.match(/[\d+\-*/()]+/);
            if (mathMatch) {
                const expression = mathMatch[0];
                return this.solveMath(expression);
            }
            return "I couldn't parse that math expression. Please use numbers and operators like +, -, *, /, and parentheses.";
        }

        // Additional Commands
        if (transcriptLower.includes("tell me a joke") || transcriptLower.includes("say a joke")) {
            return this.getRandomResponse('joke');
        }


        //conversation facilities
        // Play a Game
        if (transcriptLower.includes("i want to play game")) {
            this.context = 'playGame';
            this.contextAttempts = 0;
            return this.getRandomResponse('playGame');
        }
        // What's my IP
        if (transcriptLower.includes("what's my ip") || transcriptLower.includes("whats my ip")) {
            this.context = 'whatsMyIp';
            this.contextAttempts = 0;
            return this.getRandomResponse('whatsMyIp');
        }
        // Set an Alarm
        if (transcriptLower.includes("set an alarm")) {
            this.context = 'setAlarm';
            this.contextAttempts = 0;
            return this.getRandomResponse('setAlarm');
        }

        // Open Calculator
        if (transcriptLower.includes("open calculator")) {
            this.context = 'openCalculator';
            this.contextAttempts = 0;
            return this.getRandomResponse('openCalculator');
        }




        return this.getRandomResponse('unknown');
    }









    
    getRandomResponse(responseType) {
        const responses = this.responses[responseType] || this.responses['unknown'];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    playSong(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentSongIndex = index;
            this.audioPlayerChat.src = this.playlist[this.currentSongIndex].url;
            this.audioPlayerChat.play();
            this.audioPlayerContainerChat.classList.add('active');
            this.songTitleChat.textContent = this.playlist[this.currentSongIndex].title;
            return `Playing "${this.playlist[this.currentSongIndex].title}"`;
        }
        return "No such song in my playlist!";
    }

    playSongByTitle(title) {
        const songIndex = this.playlist.findIndex(song => song.title.toLowerCase() === title.toLowerCase());
        if (songIndex !== -1) {
            this.currentSongIndex = songIndex;
            return this.playSong(songIndex);
        }
        return "Couldn't find that song!";
    }

    stopSong() {
        this.audioPlayerChat.pause();
        this.audioPlayerChat.currentTime = 0;
        this.audioPlayerContainerChat.classList.remove('active');
        return this.getRandomResponse('stopthesong');
    }

    pauseSong() {
        this.audioPlayerChat.pause();
        return "Paused the music.";
    }

    resumeSong() {
        this.audioPlayerChat.play();
        this.audioPlayerContainerChat.classList.add('active');
        return `Resuming "${this.playlist[this.currentSongIndex].title}"`;
    }

    playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        return this.playSong(this.currentSongIndex);
    }

    playPreviousSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        return this.playSong(this.currentSongIndex);
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        return this.isRepeat ? "Repeat mode activated!" : "Repeat mode turned off.";
    }

    tellTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    }

    tellDate() {
        const now = new Date();
        return now.toDateString();
    }

    setTimer(seconds) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        const endTime = Date.now() + seconds * 1000;
        this.updateTimerDisplay(seconds);

        this.timerInterval = setInterval(() => {
            const remainingTime = Math.round((endTime - Date.now()) / 1000);
            if (remainingTime <= 0) {
                clearInterval(this.timerInterval);
                this.timerDisplay.classList.remove('active');
                const response = this.getRandomResponse('timerDone').replace('{seconds}', seconds);
                typeMessage(response, 'bot-message');
            } else {
                this.updateTimerDisplay(remainingTime);
            }
        }, 1000);
        return `Timer set for ${seconds} seconds`;
    }

    updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        this.timerDisplay.textContent = `Timer: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        this.timerDisplay.classList.add('active');
    }

    fetchWikipediaSummary(query) {
        const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.extract) {
                    const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`;
                    const summary = data.extract.length > 200 ? data.extract.substring(0, 200) + '...' : data.extract;
                    return `<div class="wikipedia-summary">${summary} <a href="${link}" target="_blank">Read more on Wikipedia</a></div>`;
                } else {
                    return "I couldn't find any information on that.";
                }
            })
            .catch(error => {
                console.error('Error fetching Wikipedia data:', error);
                return "Sorry, I couldn't fetch the information.";
            });
    }

    solveMath(expression) {
        try {
            const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
            if (!sanitizedExpression) {
                return "Invalid math expression. Please use numbers, operators (+, -, *, /), and parentheses.";
            }

            const result = eval(sanitizedExpression);
            if (isNaN(result) || !isFinite(result)) {
                return "The result is not a valid number. Please check your expression.";
            }

            return `The result of ${expression} is ${result}.`;
        } catch (error) {
            return "Error evaluating the expression. Please ensure it's a valid math expression (e.g., '5*5*5+10+10/5').";
        }
    }
}

const chatbot = new FridayChatbot();
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

function appendMessage(message, className) {
    if (!message.startsWith('y,') && !message.startsWith('g,')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function typeMessage(message, className) {
    if (!message.startsWith('y,') && !message.startsWith('g,')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let i = 0;
        const speed = 20;
        function type() {
            if (i < message.length) {
                const currentText = message.substring(0, i + 1);
                messageDiv.innerHTML = currentText;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
}

function handleInput() {
    const input = chatInput.value.trim();
    if (!input) return;

    appendMessage(input, 'user-message');
    const result = chatbot.processInput(input);

    if (typeof result === 'string') {
        typeMessage(result, 'bot-message');
    } else if (result instanceof Promise) {
        result.then(res => typeMessage(res, 'bot-message'));
    } else if (typeof result === 'object' && result.text) {
        typeMessage(result.text, 'bot-message');
        const typingDuration = result.text.length * 20 + 200;
        setTimeout(() => {
            if (result.action) result.action();
        }, typingDuration);
    }

    chatInput.value = '';
}

function clearConversation() {
    chatMessages.innerHTML = '';
    chatbot.context = null;
    chatbot.contextAttempts = 0;
    if (chatbot.contextTimeout) {
        clearTimeout(chatbot.contextTimeout);
    }
}

sendBtn.addEventListener('click', handleInput);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
});
clearBtn.addEventListener('click', clearConversation);
