import { createSlice } from '@reduxjs/toolkit';

export const alkeflixSlice = createSlice({
    name: 'alkeflix',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        // Here send id
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },
        // here clean an active event
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        // Update an event
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        // Delete an event
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvent: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            // validate if exists in the store
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id )

                if ( !exists ) {
                    state.events.push( event );
                }
            })
        },
        // Clear all data from navegate when logout
        onLogoutAlkeflix: ( state ) => {
            state.isLoadingEvents = true,
            state.events = [],
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent, onLogoutAlkeflix } = alkeflixSlice.actions;