<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>
                        <drop-modal>
                            <Button slot="footer" type="primary">确定</Button>
                        </drop-modal>
                    </td>
                    <td>
                        <drop-modal></drop-modal>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DropModal from '../drop-modal'
export default {
    name: 'xtsz-xtrz',
    components: {
        DropModal
    }
}
</script>

<style>

</style>
