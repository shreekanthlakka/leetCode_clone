import { Outlet } from "react-router";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetAllProblems } from "../actions/problemActions";
import { NewHeader } from "./NewHeader";

const Container = styled.main``;

const Main = styled.main`
    display: flex;
    /* align-items: center; */
    justify-content: center;
    height: 80vh;
`;

function AppLayout() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetAllProblems());
    }, []);
    return (
        <Container>
            {/* <Header /> */}
            <NewHeader />
            <Main>
                <Outlet />
            </Main>
        </Container>
    );
}

export default AppLayout;
