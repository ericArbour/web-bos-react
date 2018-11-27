import ItemComponent from "../components/Item";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "abc",
  title: "cool item",
  price: 50,
  description: "test",
  image: "dog.jpg",
  largeImage: "largeDog.jpg"
};

describe("<Item />", () => {
  it("renders the image properly", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it("renders the pricetag and title", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find("PriceTag");
    expect(PriceTag.children().text()).toBe("$0.50");
    expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  });

  it("renders out the buttons properly", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find(".buttonList");
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find("Link")).toHaveLength(1);
    expect(buttonList.find("AddToCart").exists()).toBe(true);
    expect(buttonList.find("DeleteItem").exists()).toBe(true);
  });

  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
