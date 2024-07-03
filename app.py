# rememeber to import stuff b/f running
import statistics  # noqa: F401
import pandas as pd
import json

import streamlit as st
from camera_input_live import camera_input_live

from data import load, get_data, set_data, add_data  # noqa: F401
from stats import per_team_stats  # noqa: F401
from query import query  # noqa: F401
from funcs import all_funcs  # noqa: F401
from processing import process
from decoding import decode

# always run this first
load()

# initializing state variables
if 'queries' not in st.session_state:
    st.session_state['queries'] = [{}]
    
if 'scanning' not in st.session_state:
    st.session_state.scanning = False

"## Query"
with st.container(border=True):
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Add Query"):
            st.session_state.queries.append({})
    with col2:
        if st.button("Remove Query"):
            st.session_state.queries.pop()
    for x in range(len(st.session_state.queries)):
        kcol, vcol, tcol = st.columns(3)
        with kcol:
            st.session_state.queries[x]['key'] = st.text_input("Key", key='key'+str(x))
        with vcol:
            st.session_state.queries[x]['val'] = st.text_input("Val", key='val'+str(x))
        with tcol:
            st.session_state.queries[x]['type'] = st.selectbox("Type",
                                                               ("str","num","bool"))
    if st.button("Submit", type='primary', use_container_width=True):
        # format queries for query() method
        formatted_queries = {}
        for q in st.session_state.queries:
            val = q['val']
            if q['type'] == 'num':
                val = int(val)
            elif q['type'] == 'bool':
                if val == 'True':
                    val = True
                else:
                    val = False
            formatted_queries[q['key']] = val
        
        st.dataframe(query(formatted_queries))
        

"## Calculations"
with st.container(border=True):
    tcol, mcol, fcol = st.columns(3)
    with tcol:
        team_path = st.text_input("Path To `team` Value")
    with mcol:
        metric_path = st.text_input("Path To `metric` Value")
    with fcol:
        func = st.selectbox("Function Applied",
                            ["none"] + list(all_funcs.keys()))
    if st.button("Calculate", type='primary', use_container_width=True):
        if func == 'none':
            re = per_team_stats(team_path, metric_path)
        else:
            re = per_team_stats(team_path, metric_path, all_funcs[func])
        re_formatted = pd.DataFrame(re.values(), index=re.keys())
        st.dataframe(re_formatted, use_container_width=True)
    
"## Scan"
def toggle_camera_on():
    st.session_state.scanning = not st.session_state.scanning

st.button("Scan", on_click=toggle_camera_on,use_container_width=True)

if st.session_state.scanning:
    img_file_buffer = camera_input_live(debounce=2500)

    if img_file_buffer:
        st.image(img_file_buffer)
        process(img_file_buffer)
        decoded_tuple = decode()
        if len(decoded_tuple) > 0:
            decoded_str = decoded_tuple[0]
            st.write(decoded_str)
            add_data(decoded_str)
            st.session_state.scanning = False

"## Raw Data"
json_str = json.dumps(get_data())

st.download_button(
    label="Download JSON",
    file_name="data.json",
    mime="application/json",
    data=json_str,
    use_container_width=True
)

st.dataframe(get_data(), use_container_width=True)
