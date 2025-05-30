  // Define the apps array with all icons from the original code
  const apps = [
    {
      href: "https://myaccount.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgprO-m-L7WtdWN_2nNj5CyPqioE0ldsaI5ThHxM3v8Bf7x20gRVNidxQSPYbG0pLe54rFGDpXfSsSfv5OR75CFFdc3CGt3cb2l-Aj_LTyNQapTzaVP7UTmvziu6O_BG-5uM8iXbvYHUlKvEHbVFZoZsjqXvGkaAoswZF7jBZpCJ_5tiQ/s1600/account.png",
      label: "Account"
    },
    {
      href: "https://drive.google.com/drive/home",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj72KLKNpBQ4H4YfqNstHnO4gdRz7v-QrPaOklTUobx6ZBicPp-sB5DJ7Bk62n8dxYcKvCSz3rvHhlpX95lq6_0izoG0ceul6xm9bm-KUX_-htzBeXK7H7O5zrg2fvOe0w9ienazOw2gn8pk0UqU0EOjIM5TJH6GpKigiWHyfuTVkr7KA/s1600/drive.png",
      label: "Drive"
    },
    {
      href: "https://www.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiqr_yGQBHqtJv5gRBU529orf4D_ouKIEVkvlpkaWkEBQfWYA7W5uUUt2G9dPxPIF0XWLKEfPfWPzA5tTZUVQVlK6phEdFzlis3XK9sHiqep-jVKXZK2AkRRuAu6UPNf9x2qLahbwE1WTGR3LVMifJbcwxuaivTt_CDaKpgJq2S0Uncw/s1600/search.png",
      label: "Search"
    },
    {
      href: "https://www.google.com/maps/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEueK5qLnAFO88HNhKBurbNXh37y7jASva8RKbIFR9u1S7KS6mEb2jLR6WF6D32HAbP0lks7Okc937klkH38sdpZpl0qZiJrJCbbseVeVDzNaYEaYDC7-vfgPJCCRhtzag5kiCbHjWTmENoIwIBq5iSvroifve0Zju7tq2uzaC6pWJ5w/s1600/maps.png",
      label: "Maps"
    },
    {
      href: "https://www.youtube.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiijsIeW4te_LlZOA2GC2I0v1B0jyGYT0a4p7sJBcLyTlH5iP8vt9Uyt-hkX0Xyg7NDsuoGWXS8sW_uFri0ueFAGBHjJm_pyi3lQ-xFY9vfQ8JXcfBRWXVAvBdZDHZdqBkMLizaa0w05Bj3Xb8N7ihROQhr9ggZI3AszcS_-6V9ocBBcg/s1600/youtube.png",
      label: "Youtube"
    },
    {
      href: "https://play.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmDMLNIazMz0_NP7O-7Qlm6A75BrGMkcP_nhCtOs2AuJv0TWSWzvc5fg5JdLxhpUdqladO2vSAJwjXJDzM2DydiUuiTNp3Tdbj60Q6iif2j-jw-hx6i1JkiMf-jK_XDzeammYr9x0U30RFW0CF_f7F4ELFsYEdwqqVRSOIVmLZi7njZQ/s1600/playstore.png",
      label: "Playstore"
    },
    {
      href: "https://news.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzuyWAIl4xx6wwlzWVt0cBXdx4YCZt5ueT0K4Ldjxbk_FANvszOxURme3pYXf4_jPoUPeMHZ1ocx-YCtRrQsYnhFQH-c4Ayf1N2oUQZufV4B7B_ns7FeaR12TRAfOK7MD7deGZIYfhWUmL3bBJAk373BuGcuK34jn24FGjQnva9QN85A/s1600/news.png",
      label: "News"
    },
    {
      href: "https://mail.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhV_eVOFOfpsskErEF60bVedQoghmPhBx8CUL_5BGpENcyEqHXAuPU2KTNzQW8LmmnWxV0ch13MTnWyY6PU2xcN4UO074V8_agDOSXnzgg9T2vuaSO9BuX0i8n9eqKA9jM5lTg5dsJa4n9_xECp7bEZNmez_u7KqwvWU2m3WyRhO0-HAA/s1600/gmail.png",
      label: "Gmail"
    },
    {
      href: "https://meet.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiazfBuC0QZtEOLD1Zwyt7rUqsPoJqwgPVFMn-rvG9sRf4sf7rAHV0X4k62OwuaAbllQf2yBW249IRWcLR38gXNkFdYcLhYSsYoo_DmIu9P1dcbtR5WO3iJu6TC6CuskBM6qSs0ZEHSSGo8GIbREfBxEbOc66Id4zDzWC06UmyEyTd6OQ/s1600/meet.png",
      label: "Meet"
    },
    {
      href: "https://mail.google.com/chat/u/0/#chat/home",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmmxohHdabYjUG6S18YaFmON0VgE0iubexQXQHbHoqfN9iwBjfuvF5V6EawAVovSICIavoztw7jmeLC7hI48uhkZ4dPU8NO7to7oxzn9D2pp7RKedaHS3OWuzIm5dWKIrqckz-quKqDPtpy9F7u0Osr5crE7GCQDnPLwLZ0zZNJdgw6g/s1600/chat.png",
      label: "Chat"
    },
    {
      href: "https://contacts.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7Ld9MczqJMlkxXrd3QxCYoXpjOc0I8wKqRrXa6eJVB-ekv_csxHkiJ4dwWXbuO85iQShxpI8ostHhx9I9NKnz4qPz5tMIPfYfhgQwFbnbZMOJE3ysRCxj1NYkT5jWmnL6Jw2xe17WlwR0VHh2Xk8vEviGicsU7brjD3mHaaT_7qQPoA/s1600/contacts.png",
      label: "Contacts"
    },
    {
      href: "https://calendar.google.com/calendar/u/0/r?pli=1",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipXc2-J-_r3ElikqG9O5DItfXrx41tnIbT8hP5Nl7yt7DqyfkMRV2wA8_QDYjTIkzTmdz9D0mXNMHkp9eX0sULZeQEgenGRCiPRgNfzwf0o15wpVESoPwV5ziN7zA9kwHueoFSfjRpcIWTZqZ-qAThIo2KkRey9IAzU5ufBPMBQe23lQ/s1600/calendar.png",
      label: "Calendar"
    },
    {
      href: "https://translate.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6OAWIlw19NCzpcCX81HfTEzoN7PM3dQs5qZTRabbfRjPSFKn_jQNzxNbK6FRoyPW7gK-tTCjHjRVFJIIS5x8P3pJAYICvap0vGmpB_c5D0kg1dhQusSPyhdMjhkUh7F9hyphenhyphenyIORB-0z1OivaNXPXwIHznI4xkZY-VebCmL9Xht27h3hw/s1600/translate.png",
      label: "Translate"
    },
    {
      href: "https://photos.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgte8w1Q65zK2bvJDzkM1rxSq9DsP9JO34WAUD-1ZlIVOytdC66AbZWo57yAcD1RMgjh2v_103JxiSg7CYXguO7P_7sDt4mITVL4_dUmedFu1EmLgfdNxZEb9nc8IXWU9JJ_Z0LWZKMZGasic5YFY-gji54leoiU0zAZaEBS1NbADcOdw/s1600/photos.png",
      label: "Photos"
    },
    {
      href: "https://shopping.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgor83NjYmHvpyV8BKRbc1d0Rr19s5iJ0UK6RjfA_BWKHBurbwB0oIW5vsBC35dQX8X0BtDHiE27QVOoJenjOLTporNdff063aYFrK_RTBr8DA6WvuKoLbz_JZfhvou47Azqkv0FZ1FFMFueNzgZVQHjwepel4QGtAHgAcwuYbzGPH1gQ/s1600/shopping.png",
      label: "Go"
    },
    {
      href: "https://www.google.com/finance/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjiTunbuGk0Z4CiVDFb-fQhfOnhauqI2haeBK7vbEugMIHpe4C8o07PHc3kwCbL5PPDdmGNPKAoJOKJZsLZbr2XwpLp1OQ9b8vamLc7uV9uiaOi9H_8Vdg78DX5yIH-OhdldueUUaFmA9bppphkSPzvFeWkqKw2EgRia1h9rGHnhWTQ9g/s1600/docs.png",
      label: "Finance"
    },
    {
      href: "https://docs.google.com/spreadsheets/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZRTEfCKfBCJijuJitsSEFA3tJ_vForB3LRurIxoAyKMDL-4wbPc8t5rSxzbTKfx_MjcwUI5CX91P2Lz1b50OGyECYyBmImqBLToR43RLmLx8m9jUZGcfy6kK_UdkKOZSRypGcqZpsne43x20YjiII5coHy1yV0bdpgdwfg61UrOgq1g/s1600/icons8-sheets-48.png",
      label: "Sheets"
    },
    {
      href: "https://docs.google.com/presentation/u/0/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisCZJCi0-Epl7vIFJqljk2yoTjV2BcK7i8sAeTqGwx7_aICOWLGkF1tQu637A4eg3zhxyo1CkRv8vGKVw_BoP1DxlwskKY73PC7iuw2QU44XlyvqEVFTrO5sfD8rOJuEiZHZy_nntDDg5EDWo3FZLkhtVxK_hWX4cQ1oIBuO9XPl2OJA/s1600/59d9428b05ac8e60f1f070de8be9d451.png",
      label: "Slides"
    },
    {
      href: "https://books.google.com",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0VUL3y-8SAPDlhtk2nwKEMDj3Q0XwED1hwu6Gmw6SkW1_kpb7fgBd2qmBWSLmeZ4jb0OJDwVQ_VvyVssg8_x3cHL2YKdYHeDq2M4ikMbW82eQ69x4jd4Iog_9J-OQ_pLDQ_VwgwB2jq4bI2OmdUt5PX-8jheh-U9I5VZDcznJuNaD8g/s1600/books.png",
      label: "Books"
    },
    {
      href: "https://www.blogger.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOA1EcnK2F7HRYzixJi0KIR4lCOFXNknY0PGgldkzc5ihkRf9bpVfABTdFvKuMToNESQdL6NSjXLLtSqStov1EgdEbRxBxWqoIUS7CNqfzlX6SdM_Qnu5T2l-MW_3oij5iSn2cztpDrC-1snk9MiweRY87BlTDpO6vw2EiUmIgvOJsjA/s1600/blogger.png",
      label: "Blogger"
    },
    {
      href: "https://keep.google.com/",
      img: "images/keep.png",
      label: "Keep"
    },
    {
      href: "https://earth.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiK0H9wVJkmb2Kw4Uc0nD6Dru3P3iLAGmeJFUdWhWQbdy1YraAqprbK-Z1QsXvJRhjM_Bd3_H0QZu2LJO37Ul2q96tpnczAMQ9oCwaqK5gVU8QDW6weWnUqQQUi6eNe6HBRyMvieleslU71MtMXL1PyXJq3Mvq6BmZHGib_JtpvL92teA/s1600/earth.png",
      label: "Earth"
    },
    {
      href: "https://classroom.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyOzbmYlIWrub0pzCjM1zQ88k9Ms-2Zc79x8p_alGKwy_33FAyIM12zC6PKjFKdiHHQHV6rUGsa39BzK6sR1v4RfPz7v9Kk3BMQNxjRk7WPq5UG0foKhn9jzdSpYcWhXQ_9eG9AcANizTa0WCsqmoa9hkjiuP4h1MGAlSEwz1FIrJvEQ/s1600/38c322e686bfa576c83f714ce9df1271.png",
      label: "Classroom"
    },
    {
      href: "https://www.google.com/interests/saved?authuser=0",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeFG6fWi5zpMvrb812r3i-mf5IBexrVWJt19J8GzQyU0YWBBK5QwFp4_Gne9tXDxj4KoITsL-uJdO-4-nFDExwHqUES3IoqS-1EFRgqX4RWYdNVRhWO4n5hbV2OeGiYqoDc72Xr5ikSsFPq2hPuH6Ce4_qeEoAIsSUyHivXVa8QCrJWA/s1600/icons8-google-save-48.png",
      label: "Saved"
    },
    {
      href: "https://chat.openai.com",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      label: "ChatGPT"
    },
    {
      href: "https://artsandculture.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbYzKJp4p-9-ce1SRqrQhotv1Fc2AcPk0cPXFCrAihhsAYqjpkWngUwRcum_X_yMeUs5ZMrA4vG55cC07bp60ERikdrOpe8M55raeHhIrzIGw4oUGluZKTZZXwhp0Jc79Y5qKW2vJH4Pog3yRERTblQ_xMoLtCj4KUQzlufeE9l-HfQQ/s1600/icons8-google-arts-and-culture-48.png",
      label: "Arts and Culture"
    },
    {
      href: "https://ads.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEie2MihXM2uxaszYIXGDcEYd1xt-jgmu4tNfyd-tIEJFQKMzvsz92VNc4PdicqFRp1O297VbtFN-Uh_HY3nrTanovUypjFCnJag7J5fnCDi5qgB-fKyOglNSCj_IDrWIkRW0EgAj_lQ-ho0GrbZrFullyDzStfqbMb0_6mEwfPEBpR1qQ/s1600/icons8-google-ads-48.png",
      label: "Ads"
    },
    {
      href: "https://one.google.com",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEht6DS6wjJhTdqP6fH4J-tqpmWUmdEyJRSS5KI5_8iz25yaBQmc47FSksiVjHWy19YVL_XaNUeRwhGjMir6ekYCcXRP3mhlH8aCfNL33j29darhI3K1k_x04GcK665piSdVWv2U5FYkEeappCBw6s9hGjahCtwd9Oty7BqfBv_sxC8xQQ/s1600/icons8-google-one-48.png",
      label: "Google One"
    },
    {
      href: "https://myadcenter.google.com",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5FxblBD4VA2MNy-3QCvx70dE1xKNiroGOJyQMtJ-tN93Thple_l0RbwziVOGXRY-5yO1bWfIoadE-KUvRtLUJSE4zp3B-1V-EDkWy2QggPYW4fpK2srL8cjnAWFwdEbLT7zoAm5QySh46PX0poHqvwIOfW7JhEUVy-rinrbmrtaw-_w/s1600/icons8-google-myadcenter-48.png",
      label: "My Ad Center"
    },
    {
      href: "https://www.google.com/travel/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibDyTY03U2l0t6POb9nfwoLand6dYfU8nS93yhBgM2IYCYsLu0wCb7zwDhYQZp3pZBSCupsmZ2mWyzHIA0RRyiPEybQpLS6ix9rewmXODWZNJlVjwjWUW3WT9nWIGolfsJMowNvDHFvarsa0lN4lQ0tBEUk5xwBin5BROlbR1IMgidWQ/s1600/icons8-google-travel-48.png",
      label: "Travel"
    },
    {
      href: "https://docs.google.com/forms/u/0/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhki1hKKWAFyODRXm3SO6w4l1fjM-ZWxL9KlUTKwarjYRtg9Y4M6Q9M584fpaTw_0zPeYxczEGozJ8bYm__pva7jOM4qbxIYPD2MZVgFrot0BjhhrD4JLawuQjYgRNnuj2wTM1GUy8mmUZZzU-SUizYL66T7i7YgcU2AHmaDt_AsIIrhw/s1600/icons8-google-forms-48.png",
      label: "Forms"
    },
    {
      href: "https://chromewebstore.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHPIbnEHlulAErNSehx_Sld2qGKNPuWQlqGAMD0qzBPj1UNEaoxf0-fUxmfo3OCbFKoc685M1je4RCDqVry_XTdb8HNODc-Fw_Qc8mCJmgV_XsrC6rLY0nkJKbOUhN5HhLnrohZAsxCtNh8qv2Gqrn5LzbBKxx8TT7BjCBqlloAx5d0Q/s1600/91b0e124284ad5049f04fd4670e9ffc1.png",
      label: "Chrome Web Store"
    },
    {
      href: "https://passwords.google.com/",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhX0ADR1vLMafgVECNzBCzGAPTegH0g_2YkJ80oKbJXaCdus5hWZE7mHMUNBBtc3xvo_MEbNBEOSmqdgYWwioenvf34jGwYNvxXueZCr8p6lg0BIQ2tjxngyxUMXL_EJ6IFEMXbhlmlkRMR_wluxAHYbZrsI_KmCq7I5c3qlWbSA2UIow/s1600/icons8-google-password-48.png",
      label: "Google Passwords"
    }
  ];

  // Load apps from local storage or use default order
  function loadApps() {
    const savedOrder = localStorage.getItem("appsOrder");
    let orderedApps = apps;
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      orderedApps = order
        .map(id => apps.find(app => app.href === id))
        .filter(app => app)
        .concat(apps.filter(app => !order.includes(app.href)));
    }
    return orderedApps;
  }

  // Render apps to the dropdown
  function renderApps() {
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";
    const orderedApps = loadApps();
    orderedApps.forEach(app => {
      const appElement = document.createElement("a");
      appElement.href = app.href;
      appElement.target = "_blank";
      appElement.className = "app-icon";
      appElement.draggable = true;
      appElement.dataset.href = app.href;
      appElement.innerHTML = `
        <img src="${app.img}" alt="${app.label}">
        <div class="app-label">${app.label}</div>
      `;
      dropdown.appendChild(appElement);
    });
    addDragAndDropListeners();
  }

  // Add drag and drop event listeners
  function addDragAndDropListeners() {
    const appIcons = document.querySelectorAll(".app-icon");
    appIcons.forEach(icon => {
      icon.addEventListener("dragstart", handleDragStart);
      icon.addEventListener("dragover", handleDragOver);
      icon.addEventListener("dragenter", handleDragEnter);
      icon.addEventListener("dragleave", handleDragLeave);
      icon.addEventListener("drop", handleDrop);
      icon.addEventListener("dragend", handleDragEnd);
    });
  }

  let draggedItem = null;

  function handleDragStart(e) {
    draggedItem = this;
    this.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.style.background = "rgba(255, 255, 255, 0.2)";
  }

  function handleDragLeave() {
    this.style.background = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    if (draggedItem !== this) {
      const allIcons = [...document.querySelectorAll(".app-icon")];
      const draggedIndex = allIcons.indexOf(draggedItem);
      const droppedIndex = allIcons.indexOf(this);

      const parent = draggedItem.parentNode;
      if (draggedIndex < droppedIndex) {
        parent.insertBefore(draggedItem, this.nextSibling);
      } else {
        parent.insertBefore(draggedItem, this);
      }

      saveAppOrder();
    }
    this.style.background = "";
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
    draggedItem = null;
    document.querySelectorAll(".app-icon").forEach(icon => {
      icon.style.background = "";
    });
  }

  // Save the current order to local storage
  function saveAppOrder() {
    const appIcons = document.querySelectorAll(".app-icon");
    const order = Array.from(appIcons).map(icon => icon.dataset.href);
    localStorage.setItem("appsOrder", JSON.stringify(order));
  }

  // Toggle dropdown visibility
  function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("show");
    if (dropdown.classList.contains("show")) {
      renderApps();
    }
  }

  // Close dropdown when clicking outside
  window.addEventListener("click", function(e) {
    const dropdown = document.getElementById("dropdown");
    const button = document.querySelector(".menu-button");
    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // Initialize apps on page load
  document.addEventListener("DOMContentLoaded", () => {
    renderApps();
  });





  