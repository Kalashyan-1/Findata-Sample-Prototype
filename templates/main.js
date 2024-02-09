const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", () => {
  const searchText = document.querySelector(".inputSearchInput");

  fetch(
    "http://127.0.0.1:8000/order_data/?organization_name=" + searchText.value,
    {
      method: "POST",
      body: {
        "Content-Type": "aplication/json",
        searchText: searchText.value,
      },
    }
  )
    .then((r) => r.json())
    .then((d) => {
      const months = [];
      const count = [];

      for (let i = 0; i < d.length; ++i) {
        console.log(d[i]);
        months.push(d[i][0]);
        count.push(d[i][1]);
      }

      show(months, count);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function show(monts, count) {
  const ctx = document.querySelector(".myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: monts,
      datasets: [
        {
          label: "# of Votes",
          data: count,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
