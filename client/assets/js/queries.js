function getAllUsers(config) {
    const url = new URL(env.url());
    fetch(`${url.href}/users/`, config)
    .then(response => response.json())
    .then(json => {
        if (json.status === 401) {
            localStorage.clear();
            showToast(false, errorResponse(json.error))
            handleLoadingComplete(true, 1);
            return redirect.home();
        }
        if (json.status < 300) {
            const table = document.querySelector('tbody');
            json.data.map((user, index) => {
                const tableRow = document.createElement('tr')
                tableRow.innerHTML = `
                    <tr>
                        <td>${index+1}</td>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>
                            <a href="#"
                                onclick="event.preventDefault();handleSelectedUser(${user.id})"
                            >
                                View
                            </a>
                        </td>
                        <!-- Accordion for mobile view -->
                        <td class="ellipsis">
                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            <!-- Dropdown content -->
                            <div class="more-options">
                                <button onclick="modalOpen(true, 'delete')" class="red">
                                    Delete
                                </button>
                            </div>
                        </td> <!-- end ellipsis -->
                        <td class="actions">
                            <a
                                href="#"
                                class="red"
                                onclick="event.preventDefault();modalOpen(true, 'delete')"
                            >
                                Delete
                            </a>
                        </td>

                    </tr>`;
                table.appendChild(tableRow);
            });
            return handleLoadingComplete(false, 1, '#fff');
        } else {
            showToast(false, 'Unable to fetch data');
            return handleLoadingComplete(true, 1)
        }
    })
    .catch(error => {
        showToast(false, 'Try again');
        return handleLoadingComplete(true, 1);
    }).
    catch(error => {
        showToast(false, 'Try again');
        return handleLoadingComplete(true, 1);
    });
    return null;
}