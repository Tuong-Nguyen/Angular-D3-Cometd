describe('enum type', () => {
    enum DoorState {
        Open,
        Closed,
        Ajar
    }

    it('Start at 0', () => {
        expect(DoorState.Open).toBe(0);
    });

    it('Increased by 1 for next eum', () => {
        expect(DoorState.Closed).toBe(1);
        expect(DoorState.Ajar).toBe(2);
    });

    it('can be accessed as array', () => {
        expect(DoorState['Open']).toBe(0);
        expect(DoorState['Closed']).toBe(1);
        expect(DoorState['Ajar']).toBe(2);
    });

    it('accessed using index return name', () => {
        expect(DoorState[0]).toBe('Open');
        expect(DoorState[1]).toBe('Closed');
        expect(DoorState[2]).toBe('Ajar');
    });

    describe('const enum type', () => {
        const enum DoorState {
            Open,
            Closed,
            Ajar
        }

        it('cannot accessed using index', () => {
            // compile error
            // expect(DoorState[0]).toBe("Open");
        });
    });
});
