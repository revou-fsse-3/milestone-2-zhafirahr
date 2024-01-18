import { useCallback, useReducer } from "react";

const REDUCER_ACTION_TYPES = {
  LOGO: "LOGO",
};

const ReducerTypeArray = [...Object.values(REDUCER_ACTION_TYPES)] as const;

type ReturnedReducerTypes = (typeof ReducerTypeArray)[number];

type ReducerStateType = {
  theSpan: string;
  topBorder: string;
  container: string;
};

type ReducerAction = {
  type: ReturnedReducerTypes;
  payload: ReducerStateType;
};

type ReducerType = (
  state: ReducerStateType,
  action: ReducerAction
) => ReducerStateType;

export const useClasses = (initial: ReducerStateType) => {
  const [logo, dispatch] = useReducer<ReducerType>((state, action) => {
    switch (action.type) {
      case REDUCER_ACTION_TYPES.LOGO:
        if (!action.payload) throw new Error("No payload");

        return {
          ...state,
          theSpan: action.payload.theSpan,
          topBorder: action.payload.topBorder,
          container: action.payload.container,
        };

      default:
        return { ...state };
    }
  }, initial);

  const setLogo = useCallback(
    (theSpan: string, topBorder: string, container: string) => {
      dispatch({
        type: "LOGO",
        payload: {
          theSpan,
          topBorder,
          container,
        },
      });
    },
    []
  );

  return { setLogo, logo };
};
