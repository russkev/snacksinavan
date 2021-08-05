import { useContext, useState, useEffect } from "react";
import { SnackContext } from "../contexts/snack.context";
// import { useDebounceEffect } from "../hooks/useDebounceEffect";

export const category = {
  drinks: 0,
  food: 1,
};

function isScrolledIntoView(element) {
  const container = document.getElementById("menu-list-1");
  if (container) {
    const containerWidth = container.clientWidth;
    const rectangle = element.getBoundingClientRect();
    return rectangle.left < containerWidth;
  }
  return false;
}

function scrollToTarget(element, offset) {
  const elementPosition = element.offsetLeft;
  document.getElementById("menu-list-1").scrollLeft = elementPosition;
}

function getCategoryCards() {
  const categoryCards = [
    document.getElementById("Cappuccino"),
    document.getElementById("Shortcrust Biscuit"),
  ];
  return categoryCards;
}

// function moveSelectorRight(selector) {
//   if (selector.classList.contains("category-left")) {
//     selector.classList.remove("category-left");
//     selector.classList.add("category-right");
//   }
// }

// function moveSelectorLeft(selector) {
//   if (selector.classList.contains("category-right")) {
//     selector.classList.remove("category-right");
//     selector.classList.add("category-left");
//   }
// }

function moveSelectorTo(selector, target) {
  const titles = document.getElementsByClassName("category");
  Array.from(titles).forEach((title, index) => {
    title.classList.add("inactive");
    if (index === target) {
      title.classList.remove("inactive");
    }
  });
  for (const value of Object.values(category)) {
    selector.classList.remove(`category-${value}`);
  }
  selector.classList.add(`category-${target}`);
  // console.log(selector);
}

/**
 * Main snacks hook. Provides data manipulation methods for the snacks menu
 */
export default function useSnacks() {
  const { snacks, loading, error } = useContext(SnackContext);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category.drinks);
  // const menuItems = document.getElementById("menu-list-1");

  // const [tempState, setTempState] = useState(() => {
  //   console.log("blah");
  //   return false;
  // });
  // useEffect(() => {
  //   if (selector) {
  //     // selector.style.animationDuration = 0;
  //     setTimeout(() => {
  //       selector.style.animationDuration = "0.35s";
  //     }, 1000);
  //   }
  // }, [selector]);

  // useEffect(() => {
  //   if (menuItems) {
  //     // menuItems.onmouseover = {() => {setMouseIsOver(true)}}
  //     // menuItems.onmouseout = () => {setMouseIsOver(false)}
  //     // menuItems.scrollLeft = 0;
  //   }
  // }, [menuItems]);

  // useDebounceEffect(() => {
  //     const categoryCards = getCategoryCards();
  //     if (menuItems && categoryCards[1]) {
  //       menuItems.addEventListener("scroll", function (e) {
  //         if (isScrolledIntoView(categoryCards[1]) && category !== 1) {
  //           setCategory(1);
  //           moveSelectorRight(selector)
  //         } else if (!isScrolledIntoView(categoryCards[1]) && category === 1) {
  //           setCategory(0);
  //           moveSelectorLeft(selector)
  //         }
  //       });

  //     }
  // }, 1000);

  useEffect(() => {
    const menuItems = document.getElementById("menu-list-1");
    const selector = document.getElementById("category-selector");

    function handleSelectorMove() {
      const categoryCards = getCategoryCards();
      // console.log(selectedCategory)
      if (menuItems && categoryCards[category.food] && selector) {
        if (
          isScrolledIntoView(categoryCards[category.food]) &&
          selectedCategory !== category.food
        ) {
          setSelectedCategory(category.food);
          moveSelectorTo(selector, category.food);
        } else if (
          !isScrolledIntoView(categoryCards[category.food]) &&
          selectedCategory !== category.drinks
        ) {
          setSelectedCategory(category.drinks);
          moveSelectorTo(selector, category.drinks);
        }
      }
    }

    function handleWheel(event) {
      if (mouseIsOver) {
        menuItems.scrollLeft += event.deltaY*5;
      }
      // console.log(event.deltaY)
      // event.deltaY > 0 && mouseIsOver
      //   ? (menuItems.scrollLeft += 500)
      //   : (menuItems.scrollLeft -= 500);
    }

    if (menuItems) {
      menuItems.addEventListener("scroll", handleSelectorMove);
      window.addEventListener("wheel", handleWheel);
    }

    if (selector) {
      setTimeout(() => {
        const titles = document.getElementsByClassName("category");
        Array.from(titles).forEach((title) => {
          title.style.animationDuration = "0.35s";
        });
        selector.style.animationDuration = "0.35s";
      }, 400);
    }
    handleSelectorMove();

    return () => {
      if (menuItems) {
        menuItems.removeEventListener("scroll", handleSelectorMove);
        window.removeEventListener("wheel", handleWheel);
      }
    };
  }, [loading, selectedCategory, mouseIsOver]);

  // useDebounceEffect(() => {
  //   if (menuItems) {
  //     window.addEventListener("wheel", function (e) {
  //       e.deltaY > 0 && mouseIsOver ? (menuItems.scrollLeft += 500) : (menuItems.scrollLeft -= 500);
  //     });
  //   }
  // }, 100);

  function updateCategory(newCategory) {
    const categoryCards = getCategoryCards();
    if (newCategory !== selectedCategory && categoryCards[category.drinks]) {
      if (newCategory === category.food) {
        scrollToTarget(categoryCards[category.food], 50);
      } else {
        scrollToTarget(categoryCards[category.drinks], 50);
      }
    }
  }

  function snackFromId(snackId) {
    return snacks.find((snack) => snack._id === snackId);
  }

  function snackFromName(snackName) {
    return snacks.find((snack) => snack.name === snackName);
  }

  return {
    loading,
    snacks,
    error,
    snackFromId,
    snackFromName,
    updateCategory,
    setMouseIsOver,
  };
}
