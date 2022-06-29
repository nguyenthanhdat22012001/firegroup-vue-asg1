let listBusinessAccount = [
  {
    id: 255697,
    name: "Account 1",
  },
  {
    id: 582235,
    name: "Account 2",
  },
  {
    id: 9789564,
    name: "Account 3",
  },
  {
    id: 524756,
    name: "Account 4",
  },
];

let listPixelAccount = [
  {
    id: 1,
    parentId: 255697,
    name: "Pixel 1",
  },
  {
    id: 2,
    parentId: 582235,
    name: "Pixel 2",
  },
  {
    id: 3,
    parentId: 582235,
    name: "Pixel 3",
  },
  {
    id: 4,
    parentId: 255697,
    name: "Pixel 4",
  },
  {
    id: 5,
    parentId: 9789564,
    name: "Pixel 5",
  },
  {
    id: 6,
    parentId: 255697,
    name: "Pixel 6",
  },
  {
    id: 7,
    parentId: 582235,
    name: "Pixel 7",
  },
  {
    id: 8,
    parentId: 9789564,
    name: "Pixel 8",
  },
  {
    id: 9,
    parentId: 255697,
    name: "Pixel 9",
  },
  {
    id: 10,
    parentId: 582235,
    name: "Pixel 10",
  },
  {
    id: 11,
    parentId: 9789564,
    name: "Pixel 11",
  },
  {
    id: 12,
    parentId: 255697,
    name: "Pixel 12",
  },
];

var vm = new Vue({
  el: "#app",
  data: {
    tabsAction: true,
    isShowAlert: false,
    listBusinessAccount: listBusinessAccount,
    listPixelAccount: listPixelAccount,
    SelectedBusinessAccount: "",
    listPixelAccountFilter: [],

    validate: false,
    pixelName: "",
    pixelID: "",
    error: {
      pixelName: "",
      pixelID: "",
    },
  },
  methods: {
    onChangeTabs(active) {
      this.tabsAction = active;
    },
    onClickResetAutoTabs() {
      this.SelectedBusinessAccount = "";
      this.listPixelAccountFilter = [];
    },
    onSaveTabsManual(){
       this.validate = true;
       this.onValidatePixelName(this.pixelName);
       this.onValidatePixelID(this.pixelID);
    },
    onValidatePixelName(newValue) {
      let validate = this.validateRegexOnlyHasNumber(newValue);
      if(newValue != ""){
        if (validate) {
            this.error.pixelName = "Không được nhập kí tự số";
          }else{
            this.error.pixelName = "";
          }
      }
      
      console.log(this.error);
    },
    onValidatePixelID(newValue) {
        if(newValue != ""){
            let validate = this.validateRegexOnlyHasNumber(newValue);
            if (!validate) {
              this.error.pixelID = "Không được nhập kí tự chữ";
            }else{
                this.error.pixelID = "";
            }
        }
      
        console.log(this.error);
      },
    // validate method 
    validateRegexOnlyHasString(value) {
        let pattern = /^[a-zA-Z]+$/;
        return pattern.test(value);
      },
      
    validateRegexOnlyHasNumber(value) {
          let pattern = /^[0-9]+$/;
          return pattern.test(value);
      },
  },
  watch: {
    SelectedBusinessAccount: function (newValue) {
      let newData = [...this.listPixelAccount].filter(
        (item) => item.parentId == newValue
      );
      this.listPixelAccountFilter = newData;

      if (newData.length == 0) {
        this.isShowAlert = true;
      }

      if (newData.length > 0) {
        this.isShowAlert = false;
      }

      if (this.SelectedBusinessAccount == "") {
        this.isShowAlert = false;
      }
    },
    pixelName: function(newValue){
        if(this.validate){
            this.onValidatePixelName(newValue);
        }
    },
    pixelID: function(newValue){
        if(this.validate){
            console.log('change')
            this.onValidatePixelID(newValue);
        }
    },
  },
});


  