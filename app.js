const functionUrlEl = document.getElementById("function-url");
const adminTokenEl = document.getElementById("admin-token");
const userNameEl = document.getElementById("user-name");
const prefixEl = document.getElementById("prefix");
const planEl = document.getElementById("plan");
const resultEl = document.getElementById("result");
const recentListEl = document.getElementById("recent-list");

function loadSettings() {

  functionUrlEl.value =
    localStorage.getItem("tsbd_function_url")
    || functionUrlEl.value;

  adminTokenEl.value =
    localStorage.getItem("tsbd_admin_token")
    || "";

  prefixEl.value =
    localStorage.getItem("tsbd_prefix")
    || "TSBD";

}

function saveSettings() {

  localStorage.setItem(
    "tsbd_function_url",
    functionUrlEl.value.trim()
  );

  localStorage.setItem(
    "tsbd_admin_token",
    adminTokenEl.value.trim()
  );

  localStorage.setItem(
    "tsbd_prefix",
    prefixEl.value.trim() || "TSBD"
  );

}

function showResult(type, html) {

  resultEl.hidden = false;

  resultEl.className =
    "result " + type;

  resultEl.innerHTML = html;

}

async function callApi(method, body) {

  saveSettings();

  const url =
    functionUrlEl.value.trim();

  const token =
    adminTokenEl.value.trim();

  if (!url || !token) {

    throw new Error(
      "Function URL and admin token are required."
    );

  }

  let res;

  try {

    res = await fetch(url, {

      method,

      headers: {

        "Content-Type":
        "application/json",

        "x-admin-token":
        token,

      },

      body:

      body ?

      JSON.stringify(body)

      :

      undefined,

    });

  }

  catch {

    throw new Error(
      "Cannot connect to Supabase function."
    );

  }

  const data =

  await res.json()

  .catch(() => ({}));

  if (

    !res.ok ||

    data.success === false

  ) {

    throw new Error(

      data.error ||

      data.message ||

      "Request failed."

    );

  }

  return data;

}



async function createLicense() {

  const btn =

  document.getElementById(

    "create-btn"

  );

  btn.disabled = true;

  btn.textContent =

  "Creating...";

  try {

    const data =

    await callApi(

      "POST",

      {

      user_name:

      userNameEl

      .value

      .trim(),

      plan_slug:

      planEl.value,

      prefix:

      prefixEl

      .value

      .trim()

      ||

      "TSBD",

      }

    );



    showResult(

      "success",

      `

      License created

      <span class="license-key">

      ${data.license_key}

      </span>

      <button

      class="secondary"

      id="copy-btn">

      Copy

      </button>

      `

    );



    document

    .getElementById(

      "copy-btn"

    )

    .onclick =

    async () => {

      await navigator

      .clipboard

      .writeText(

        data.license_key

      );

      document

      .getElementById(

        "copy-btn"

      )

      .textContent =

      "Copied";

    };



    await loadRecent();

  }

  catch (err) {

    showResult(

      "error",

      err.message

    );

  }

  finally {

    btn.disabled = false;

    btn.textContent =

    "Create License";

  }

}



async function loadRecent() {

  const btn =

  document.getElementById(

    "recent-btn"

  );



  btn.disabled = true;

  btn.textContent =

  "Loading...";



  try {

    const data =

    await callApi("GET");



    const rows =

    data.licenses || [];



    recentListEl.innerHTML =

    rows.length

    ?

    rows.map(

      row => `

      <div class="item">

      <strong>

      ${escapeHtml(

      row.license_key

      )}

      </strong>



      <span>

      ${escapeHtml(

      row.user_name ||

      "No name"

      )}

      |

      ${escapeHtml(

      row.plan_slug ||

      ""

      )}

      |

      <b

      style="color:

      ${

      row.status

      ===

      "blocked"

      ?

      "#ff6262"

      :

      "#18d17b"

      }

      ">

      ${escapeHtml(

      row.status ||

      ""

      )}

      </b>

      </span>



      <div

      class="license-actions">

      ${

      row.status

      ===

      "blocked"

      ?

      `

      <button

      onclick="unblockLicense(

      '${row.license_key}'

      )">

      Unblock

      </button>

      `

      :

      `

      <button

      onclick="blockLicense(

      '${row.license_key}'

      )">

      Block

      </button>

      `

      }



      <button

      class="secondary"

      onclick="copyLicense(

      '${row.license_key}'

      )">

      Copy

      </button>



      </div>

      </div>

      `

    )

    .join("")



    :

    `

    <p class="empty">

    No licenses found.

    </p>

    `;

  }

  catch (err) {

    recentListEl.innerHTML =

    `

    <p class="empty">

    ${escapeHtml(

    err.message

    )}

    </p>

    `;

  }

  finally {

    btn.disabled = false;

    btn.textContent =

    "Load Recent";

  }

}



async function blockLicense(key){

  try{

    await callApi(

      "POST",

      {

      action:"block",

      license_key:key

      }

    );



    await loadRecent();

  }

  catch(err){

    alert(err.message);

  }

}



async function unblockLicense(key){

  try{

    await callApi(

      "POST",

      {

      action:"unblock",

      license_key:key

      }

    );



    await loadRecent();

  }

  catch(err){

    alert(err.message);

  }

}



async function copyLicense(key){

  await navigator

  .clipboard

  .writeText(key);

  alert("Copied");

}



function escapeHtml(value){

  const div =

  document.createElement(

    "div"

  );

  div.textContent =

  String(value || "");

  return div.innerHTML;

}



document

.getElementById(

"create-btn"

)

.addEventListener(

"click",

createLicense

);



document

.getElementById(

"recent-btn"

)

.addEventListener(

"click",

loadRecent

);



loadSettings();
