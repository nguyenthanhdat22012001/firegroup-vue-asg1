let list_business_account = [
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

let list_pixel_account = [
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
    tabs_action: true,
    list_business_account: list_business_account,
    list_pixel_account: list_pixel_account,

    formstate_input: false,
    form_input: {
      name: "",
      id: "",
    },

    formstate_select: false,
    form_select: {
      select_business: "",
      select_pixel: "",
    },
  },
  methods: {
    onChangeTabs(active) {
      this.tabs_action = active;
    },
    // auto tabs
    onClickResetAutoTabs() {
      this.form_select.select_business = "";
      this.formstate_select = false;
      this.form_select.select_pixel = "";
    },
    onSaveAutoTab() {
      this.formstate_select = true;
      if (this.validationSelectComputed.valid) {
        alert("success");
      }
    },

    // manual tabs
    onSaveTabsManual() {
      this.formstate_input = true;
      if(this.validationInputComputed.valid){
        alert('success')
      }
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
  computed: {
    listPixelAccountFilter() {
      return [...this.list_pixel_account].filter(
        (item) => item.parentId == this.form_select.select_business
      );
    },
    validationSelectComputed() {
      const select_business = {
        required: this.form_select.select_business ? true : false,
      };

      let select_pixel = {
        required: true,
        empty: this.listPixelAccountFilter.length > 0 ? true : false,
      };

      if (
        this.form_select.select_business &&
        this.listPixelAccountFilter.length > 0
      ) {
        select_pixel = {
          ...select_pixel,
          required: this.form_select.select_pixel ? true : false,
        };
      }

      if (this.form_select.select_business == "") {
        select_pixel = {
          ...select_pixel,
          empty: true,
        };
      }

      return {
        form: {
          select_business,
          select_pixel,
        },
        valid:
          select_business.required &&
          select_pixel.required &&
          select_pixel.empty,
      };
    },
    validationInputComputed() {
      const name = {
        required: this.form_input.name ? true : false,
        is_string: !this.validateRegexOnlyHasNumber(this.form_input.name),
      };
      const id = {
        required: this.form_input.id ? true : false,
        is_number: this.validateRegexOnlyHasNumber(this.form_input.id),
      };
      return {
        form: {
          name,
          id,
        },
        valid: name.required && name.is_string && id.required && id.is_number,
      };
    },
  },
});
