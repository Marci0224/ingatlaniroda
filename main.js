const url="https://raw.githubusercontent.com/mkatay/json_ingatlanok/refs/heads/main/ingatlanok";
const urlPhoto='https://raw.githubusercontent.com/mkatay/JF_Kando_vizsga_forras/refs/heads/master/public/'

let houses=[]
getData(url,renderData)
let categories=[];

function renderData(data) {
  houses=data;
  categories=getUniqueValues(data, 'category')
  console.log(categories);
  categories.forEach(item => {
    console.log(item);
    document.querySelector('.valaszt').innerHTML+=`
    <div class="p-3">
        <input type="radio" onchange="handleChange()" value="${item}" name="category" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${item}</label>
    </div>
    `;
  });
}

function showCards(arr){
  document.querySelector(".cards").innerHTML="";
  arr.forEach(item=>{
    console.log(item);
    document.querySelector(".cards").innerHTML+=`
      <div class="card flex flex-col sm:flex-nowrap m-2 max-w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex justify-end">
          <span class="font-normal relative text-white border border-white border-2 rounded-full p-[7px] m-[10px]">${item.category}<span>
        </div>
        <img src="${urlPhoto+item.imageUrl}" alt="" class="object-contain w-full rounded-t-lg h-72 md:h-auto md:w-36 grid-cols-1">
        <div class="flex flex-col justify-between p-4 leading-normal items-center">
          <div class="flex justify-between p-4 items-center">
            <p>Eladó: <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ps-2">${item.sellerName}</h5></p>
          </div>
          <div class="flex flex-col justify-between leading-normal md:flex-row">
            <div class="flex items-center p-2">
              <p>Területe: <p class="font-normal text-gray-700 dark:text-gray-300 p-2">${item.area}$</p></p>
            </div>
            <div class="flex items-center p-2">
              <p>Szobák száma:<p class="font-normal text-gray-700 dark:text-gray-300 p-2"> ${item.rooms}</p></p>
            </div>
          </div>
          <p>Hirdetés feladásának dátuma: ${item.createAt}</p>
        <div>
        
      </div>
    `
  })
}

function handleChange(){
  console.log("klikk");
  const checkedValues=[];
  document.querySelectorAll('input[type="radio"]:checked').forEach(domObj=>
    checkedValues.push(domObj.value)
  );
  console.log(checkedValues);
  const filteredHouses=houses.filter(obj=>checkedValues.includes(obj.category));
  console.log(filteredHouses);
  showCards(filteredHouses);
}